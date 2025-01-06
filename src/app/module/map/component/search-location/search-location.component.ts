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
import { MultiSelectData } from 'src/app/module/shared/model/multi-selelect-dropdown.model';

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
  params_for_map: HttpParams = new HttpParams();
  title:string = "Keyword";
  sectors: any;
  locationForm!: FormGroup; // Define the FormGroup
  defaultValue: Array<MultiSelectData> = [];
  dropdownList: any = [];
  showError: boolean =false;
  userRole!: string | null;

  constructor(private alertServices: AlertService,
    private modalService: BsModalService,
    private router: Router,
    private searchLocationService: SearchLocationService,
    private modalRef: BsModalRef,
    private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.getKeywords();
    this.locationForm = this.fb.group({
      sector: ['', Validators.required], // 'sector' dropdown with required validation
      location: ['', Validators.required] // 'location' textbox with required validation
    });

    this.params = this.params.append("page", 0);
    this.params = this.params.append("size", 15);

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

  getUserRole(){
    this.userRole = sessionStorage.getItem('userRoles');
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
    this.params = this.params.append("location", this.locationForm.value.location);
    this.params = this.params.append("sector", this.locationForm.value.sector);

    if(this.userRole=='ADMIN'){
      this.params_for_map=this.params_for_map.append("location", this.locationForm.value.location);
      this.params_for_map=this.params_for_map.append("sector", this.locationForm.value.sector);

      this.searchLocationService
      .genrateData(this.params_for_map)
      .subscribe((sucess: any) => {
        this.dataDataTable = sucess;
      });
    }

    this.searchLocationService
      .getAll(this.params)
      .subscribe((sucess: any) => {
        this.dataDataTable = sucess;
      });
  }

  selectedDataKeywords(data: Array<MultiSelectData>) {
    console.log(data)
    if (data?.length > 0) {
      let filterData = data.map((x: MultiSelectData) => x.id);
       // Convert filterData array to a comma-separated string
      let filterDataString = filterData.join(',');
      console.log(filterDataString);  // Outputs: "1,2"

      // Set the value in the form control
      this.locationForm.controls['sector'].patchValue(filterDataString);
    } else {
      this.locationForm.controls['sector'].reset("")
    }
  }

  getKeywords() {
    this.searchLocationService.getSectorData().subscribe((success: any) => {
      let a: any = []
      let b: any = []
      for (let [keywordId, name] of Object.entries(success)) {
        console.log("keywordId", keywordId)
        a.push(name);
        b.push({ name: name, id: keywordId })
      }

      this.dropdownList = a;
      this.locationForm.controls["sector"].patchValue(b);
    })
  }

  onErrorScope(){
    this.showError = true;
  }
}