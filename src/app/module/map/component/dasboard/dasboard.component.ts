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
import { MonthOption } from '../../models/month.model';

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
  userRole!: string | null;
  selectedApiType: 'contacts' | 'geocodes' | 'places' = 'contacts';
  selectedMonth: number = 1; // Default to 1 month
  months: MonthOption[] = [
    new MonthOption('1 month', 1),
    new MonthOption('2 months', 2),
    new MonthOption('3 months', 3),
    new MonthOption('4 months', 4),
    new MonthOption('5 months', 5),
    new MonthOption('6 months', 6),
    new MonthOption('7 months', 7),
    new MonthOption('8 months', 8),
    new MonthOption('9 months', 9),
    new MonthOption('10 months', 10),
    new MonthOption('11 months', 11),
    new MonthOption('12 months', 12)
  ];
  
  constructor(private alertServices: AlertService,
      private modalService: BsModalService,
      private router: Router,
      private dashboardService: DashboardService,
      private modalRef: BsModalRef,
      private fb: FormBuilder) {
  
    }

  ngOnInit(): void {

      this.fetchDataCounts();
      this.getUserRole();
      this.params = this.params.append("page", 0);
      this.params = this.params.append("size", 15);
      this.params = this.params.append('months', this.selectedMonth)
      this.params= this.params.append("name",'');
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
  
    getUserRole(){
      this.userRole = sessionStorage.getItem('userRoles');
    }

    buttonEvent1(data: any) {

    }
  
    changePageSortSearch(params: HttpParams, apiType: 'contacts' | 'geocodes' | 'places') {
      if (!params.get('sort')) {
        params = params.set('sort', 'id,DESC');
      }
      
      if (!params.get('name')) {
        params = params.set('name', '');
      }
  
      let metadataApi, dataApi;
      switch (apiType) {
        case 'contacts':
          metadataApi = this.dashboardService.getContactMetadata();
          dataApi = this.dashboardService.getAllContactData(params);
          break;
        case 'geocodes':
          metadataApi = this.dashboardService.getGeoCodeMetadata();
          dataApi = this.dashboardService.getAllGeoCodeData(params);
          break;
        case 'places':
          metadataApi = this.dashboardService.getPlaceMetadata();
          dataApi = this.dashboardService.getAllPlaceData(params);
          break;
      }
  
      forkJoin({ tableHeader: metadataApi, tableData: dataApi }).subscribe(
        (response) => {
          this.columnsMetadata = response.tableHeader;
          this.dataDataTable = response.tableData;
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    }  

  // Fetch counts from the API
  fetchDataCounts() {
    this.dashboardService.getDashboardCount().subscribe((response: any) => {
      this.dashboardCount = response;
    })
  }

  onSearchCountClick(apiType: 'contacts' | 'geocodes' | 'places') {
    // Set the selected API type
    this.selectedApiType = apiType;

    // Trigger the table update
    this.changePageSortSearch(this.params, apiType);
  }

  // Function to handle month change
  onMonthChange() {
    this.params = this.params.delete('months');
    this.params=this.params.append('months', this.selectedMonth)
    this.changePageSortSearch(this.params, this.selectedApiType);
  }

}
