import { HttpParams } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { forkJoin } from 'rxjs';
import { DataTableComponent } from 'src/app/module/shared/component/data-table/data-table.component';
import { modalOptionsDialogRighted } from 'src/app/module/shared/model/constants.model';
import { TableHeaderMetaData } from 'src/app/module/shared/model/table-header-list.model';
import { AlertService } from 'src/app/module/shared/service/alert.service';
import { SectorFormComponent } from '../sector-form/sector-form.component';
import { DataDataTable } from 'src/app/module/shared/model/data-data-table.model';
import { AlertOptions } from 'src/app/module/shared/model/alert.model';
import { SectorService } from '../../service/sector.service';

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.scss']
})
export class SectorComponent {

  sectorId!: number;
  columnsMetadata!: TableHeaderMetaData;
  permission: Array<boolean> = [true, true, true];
  @ViewChild(DataTableComponent) dataTable!: DataTableComponent;
  dataDataTable: DataDataTable = { content: [], totalPages: 0 };
  alertOptions: AlertOptions = { autoClose: true, keepAfterRouteChange: true };
  params: HttpParams = new HttpParams();
  title:string = "Sectors";


  constructor(private alertServices: AlertService,
    private modalService: BsModalService,
    private router: Router,
    private sectorService: SectorService,
    private modalRef: BsModalRef) {

  }

  ngOnInit(): void {
    this.params = this.params.append("page", 0);
    this.params = this.params.append("size", 15);
    forkJoin
    ({
      tableHeader: this.sectorService.getMetadata(),
      tableData: this.sectorService.getAll(this.params),
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
      modalRef = this.modalService.show(SectorFormComponent, {
        ...modalOptionsDialogRighted

      });
    }
    else if (data.event == 'edit') {
      modalRef = this.modalService.show(SectorFormComponent, {
        ...modalOptionsDialogRighted,
        initialState: {
          sectorId: data.data.id
        }
      });
    } else if (data.event == "delete") {
      this.sectorService.delete(data.data.id).subscribe((response) => {
        this.params = this.params.set("page", data.pageNumber);
          this.dataTable.pagination.serchingParmeter = "";
          this.changePageSortSearch(this.params);
          this.alertServices.success(
            "Record deleted successfully",
            this.alertOptions
          );
      })
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

    this.params = params;
    this.sectorService
      .getAll(params)
      .subscribe((sucess: any) => {
        this.dataDataTable = sucess;
      });
  }
}
