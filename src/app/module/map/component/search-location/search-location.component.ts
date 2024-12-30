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

@Component({
  selector: 'app-search-location',
  templateUrl: './search-location.component.html',
  styleUrls: ['./search-location.component.scss']
})
export class SearchLocationComponent {
keywordId!: number;
  columnsMetadata!: TableHeaderMetaData;
  permission: Array<boolean> = [true, true, true];
  @ViewChild(DataTableComponent) dataTable!: DataTableComponent;
  dataDataTable: DataDataTable = { content: [], totalPages: 0 };
  alertOptions: AlertOptions = { autoClose: true, keepAfterRouteChange: true };
  params: HttpParams = new HttpParams();
  title:string = "Keyword";


  constructor(private alertServices: AlertService,
    private modalService: BsModalService,
    private router: Router,
    private searchLocationService: SearchLocationService,
    private modalRef: BsModalRef) {

  }

  ngOnInit(): void {console.log("here")
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
  }

  buttonEvent1(data: any) {
    let modalRef: BsModalRef | any = null;
    if (data.event == 'add') {
      modalRef = this.modalService.show(KeywordFormComponent, {
        ...modalOptionsDialogRighted

      });
    }
    else if (data.event == 'edit') {
      modalRef = this.modalService.show(KeywordFormComponent, {
        ...modalOptionsDialogRighted,
        initialState: {
          keywordId: data.data.keywordId
        }
      });
    } else if (data.event == "delete") {
      // this.searchLocationService.delete(data.data.keywordId).subscribe((response) => {
      //   this.params = this.params.set("page", data.pageNumber);
      //     this.dataTable.pagination.serchingParmeter = "";
      //     this.changePageSortSearch(this.params);
      //     this.alertServices.success(
      //       "Record deleted successfully",
      //       this.alertOptions
      //     );
      // })
    }
    else if (data.event == 'inSidebtn') {
      if (data.event == 'PlaceId') {
       // this.templateService.setPersonId(event.data.personId);
       // this.templateService.setPreview(true);
     //   this.router.navigate(['/resume/stepper-dashboard']);
      }
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

  changePageSortSearch(params: HttpParams) {

    if (params.get("sort")) {
      let sortKey = params.get("sort")!.split(",");
    }

    if (!params.get("sort")) {
      params = params.set("sort", "keywordId,DESC");
    }

    this.params = params;
    this.searchLocationService
      .getAll(params)
      .subscribe((sucess: any) => {
        this.dataDataTable = sucess;
      });
  }
}