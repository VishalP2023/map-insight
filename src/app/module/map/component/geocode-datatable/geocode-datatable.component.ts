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
import { SearchLocationService } from '../../service/search-location.service';
import { KeywordFormComponent } from '../keyword-form/keyword-form.component';
import { GeocodeService } from '../../service/geocode.service';
import { GeocodeComponent } from '../geocode/geocode.component';

@Component({
  selector: 'app-geocode-datatable',
  templateUrl: './geocode-datatable.component.html',
  styleUrls: ['./geocode-datatable.component.scss']
})
export class GeocodeDatatableComponent {
  columnsMetadata!: TableHeaderMetaData;
  permission: Array<boolean> = [true, false, false];
  @ViewChild(DataTableComponent) dataTable!: DataTableComponent;
  dataDataTable: DataDataTable = { content: [], totalPages: 0 };
  alertOptions: AlertOptions = { autoClose: true, keepAfterRouteChange: true };
  params: HttpParams = new HttpParams();
  title:string = "Keyword";


  constructor(private alertServices: AlertService,
    private modalService: BsModalService,
    private router: Router,
    private geocodeService: GeocodeService,
    private modalRef: BsModalRef) {

  }

  ngOnInit(): void {
    this.params = this.params.append("page", 0);
    this.params = this.params.append("size", 15);
    this.params= this.params.append("name",'');
    forkJoin({
      tableHeader: this.geocodeService.getMetadata(),
      tableData: this.geocodeService.getAll(this.params),
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
      modalRef = this.modalService.show(GeocodeComponent, {
        ...modalOptionsDialogRighted

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

  changePageSortSearch(params: HttpParams) {

    if (params.get("sort")) {
      let sortKey = params.get("sort")!.split(",");
    }

    if (!params.get("sort")) {
      params = params.set("sort", "id,DESC");
    }

    if (!params.get("name")) {
      params = params.set("name", "");
    }

    this.params = params;
    this.geocodeService
      .getAll(params)
      .subscribe((sucess: any) => {
        this.dataDataTable = sucess;
      });
  }
}
