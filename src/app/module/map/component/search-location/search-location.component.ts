import { HttpParams } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { forkJoin } from 'rxjs';
import { DataTableComponent } from 'src/app/module/shared/component/data-table/data-table.component';
import { AlertOptions } from 'src/app/module/shared/model/alert.model';
import { modalOptionsDialogRighted } from 'src/app/module/shared/model/constants.model';
import { DataDataTable } from 'src/app/module/shared/model/data-data-table.model';
import { TableHeaderMetaData } from 'src/app/module/shared/model/table-header-list.model';
import { AlertService } from 'src/app/module/shared/service/alert.service';
import { KeywordService } from '../../service/keyword.service';
import { KeywordFormComponent } from '../keyword-form/keyword-form.component';
import { SearchLocationService } from '../../service/search-location.service';
import { ContactDetailsComponent } from '../contact-details/contact-details.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-location',
  templateUrl: './search-location.component.html',
  styleUrls: ['./search-location.component.scss']
})
export class SearchLocationComponent {
keywordId!: number;
  columnsMetadata!: TableHeaderMetaData;
  permission: Array<boolean> = [false, false, false];
  @ViewChild(DataTableComponent) dataTable!: DataTableComponent;
  dataDataTable: DataDataTable = { content: [], totalPages: 0 };
  alertOptions: AlertOptions = { autoClose: true, keepAfterRouteChange: true };
  params: HttpParams = new HttpParams();
  title:string = "Keyword";
  sectors: any;
  locationForm!: FormGroup; // Define the FormGroup

  constructor(private alertServices: AlertService,
    private modalService: BsModalService,
    private router: Router,
    private searchLocationService: SearchLocationService,
    private modalRef: BsModalRef,
    private fb: FormBuilder) {

  }

  ngOnInit(): void {

    this.locationForm = this.fb.group({
      sector: ['1', Validators.required], // 'sector' dropdown with required validation
      location: ['thane', Validators.required] // 'location' textbox with required validation
    });

    this.params = this.params.append("page", 0);
    this.params = this.params.append("size", 15);
    this.params = this.params.append("location", this.locationForm.value.location);
    this.params = this.params.append("sector", this.locationForm.value.sector);
    forkJoin({
      tableHeader: this.searchLocationService.getMetadata(),
      tableData: this.searchLocationService.getAll(this.params),
    }).subscribe((response) => {
      this.columnsMetadata = response.tableHeader,
        this.dataDataTable = response.tableData
    },
      (error) => {

      })

      this.getSectorData()
  }

  getSectorData() {
    this.searchLocationService.getSectorData().subscribe((response: any) => {
      this.sectors = response
    })
  }

  buttonEvent1(data: any) {
    let modalRef: BsModalRef | any = null;
    
    if (data.event == 'inSidebtn') {
      modalRef = this.modalService.show(ContactDetailsComponent, {
        ...modalOptionsDialogRighted,
        initialState: {
          placeId: data.data.placeId
        }
      });
    }
    if (modalRef) {
      modalRef.onHidden.subscribe(
        (refreshData: boolean) => {
          if (refreshData === true) {
            this.dataTable.pagination.serchingParmeter = "";
            let params = new HttpParams()
            params = params.append("page", 0);
            params = params.append("size", 15);
            this.changePageSortSearch(params);
          }
        }
      );
    }
  }

  onSubmit(): void {
    if (this.locationForm.valid) {
      console.log('Form Submitted', this.locationForm.value);
       // Remove existing location and sector from params
       this.params = this.params.delete('location');
       this.params = this.params.delete('sector');
      this.params = this.params.append("location", this.locationForm.value.location);
      this.params = this.params.append("sector", this.locationForm.value.sector);
      
      this.changePageSortSearch(this.params)
    } else {
      console.log('Form is not valid');
    }
  }

  changePageSortSearch(params: HttpParams) {

    if (params.get("sort")) {
      let sortKey = params.get("sort")!.split(",");
    }

    if (!params.get("sort")) {
      params = params.set("sort", "id,DESC");
    }

    this.params = params;
    this.params = this.params.delete('location');
    this.params = this.params.delete('sector');
    this.params = this.params.append("page", 0);
    this.params = this.params.append("size", 15);
    this.params = this.params.append("location", this.locationForm.value.location);
    this.params = this.params.append("sector", this.locationForm.value.sector);
    console.log("sfsd", this.params)

    this.searchLocationService
      .getAll(params)
      .subscribe((sucess: any) => {
        this.dataDataTable = sucess;
      });
  }
}