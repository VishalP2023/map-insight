import { HttpParams } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { forkJoin } from 'rxjs';
import { DataTableComponent } from 'src/app/module/shared/component/data-table/data-table.component';
import { AlertOptions } from 'src/app/module/shared/model/alert.model';
import { modalOptionsDialogRighted } from 'src/app/module/shared/model/constants.model';
import { DataDataTable } from 'src/app/module/shared/model/data-data-table.model';
import { TableHeaderMetaData } from 'src/app/module/shared/model/table-header-list.model';
import { AlertService } from 'src/app/module/shared/service/alert.service';
import { GeocodeComponent } from '../geocode/geocode.component';
import { DashboardService } from '../../service/dashboard.service';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.scss']
})
export class DasboardComponent {
  geoCodeCount: number = 0;
  contactDetailsCount: number = 0;
  dataRows: any[] = [];
  columnsMetadata!: TableHeaderMetaData;
  permission: Array<boolean> = [false, false, false];
  @ViewChild(DataTableComponent) dataTable!: DataTableComponent;
  dataDataTable: DataDataTable = { content: [], totalPages: 0 };
  alertOptions: AlertOptions = { autoClose: true, keepAfterRouteChange: true };
  params: HttpParams = new HttpParams();
  dashboardCount: any;
  title:string = "Dashboard";

  constructor(private alertServices: AlertService,
      private modalService: BsModalService,
      private router: Router,
      private dashboardService: DashboardService,
      private modalRef: BsModalRef,
      private fb: FormBuilder) {
  
    }

  ngOnInit(): void {

      this.fetchDataCounts();
      this.params = this.params.append("page", 0);
      this.params = this.params.append("size", 15);
      this.params= this.params.append("name",'');
      forkJoin({
        tableHeader: this.dashboardService.getPlaceMetadata(),
        tableData: this.dashboardService.getAllPlaceData(this.params),
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
      this.dashboardService
        .getAllPlaceData(params)
        .subscribe((sucess: any) => {
          this.dataDataTable = sucess;
        });
    }

  // Fetch counts from the API
  fetchDataCounts() {
    this.dashboardService.getDashboardCount().subscribe((response: any) => {
      this.dashboardCount = response;
    })
  }

  onSearchContactsCountClick() {
    // Handle the click event for Search Contacts Count
    forkJoin({
      tableHeader: this.dashboardService.getContactMetadata(),
      tableData: this.dashboardService.getAllContactData(this.params),
    }).subscribe((response) => {
      this.columnsMetadata = response.tableHeader,
        this.dataDataTable = response.tableData
    },
      (error) => {

      })
  }
  
  onSearchGeocodesCountClick() {
    // Handle the click event for Search Geocodes Count
    forkJoin({
      tableHeader: this.dashboardService.getGeoCodeMetadata(),
      tableData: this.dashboardService.getAllGeoCodeData(this.params),
    }).subscribe((response) => {
      this.columnsMetadata = response.tableHeader,
        this.dataDataTable = response.tableData
    },
      (error) => {

      })
  }
  
  onSearchPlacesCountClick() {
    // Handle the click event for Search Places Count
    forkJoin({
      tableHeader: this.dashboardService.getPlaceMetadata(),
      tableData: this.dashboardService.getAllPlaceData(this.params),
    }).subscribe((response) => {
      this.columnsMetadata = response.tableHeader,
        this.dataDataTable = response.tableData
    },
      (error) => {

      })
  }
}
