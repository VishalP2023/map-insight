import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { forkJoin } from 'rxjs';
import { DataTableComponent } from 'src/app/module/shared/component/data-table/data-table.component';
import { AlertOptions } from 'src/app/module/shared/model/alert.model';
import { MultiSelectData } from 'src/app/module/shared/model/multi-selelect-dropdown.model';
import { AlertService } from 'src/app/module/shared/service/alert.service';
import { SearchLocationService } from '../../service/search-location.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent {
keywordId!: number;
  alertOptions: AlertOptions = { autoClose: true, keepAfterRouteChange: true };
  params: HttpParams = new HttpParams();
  params_for_map: HttpParams = new HttpParams();
  sectors: any;
  locationForm!: FormGroup; // Define the FormGroup
  defaultValue: Array<MultiSelectData> = [];
  dropdownList: any = [];
  showError: boolean =false;
  userRole!: string | null;
  cardDivHeight!: string;
  divHeight!: number;

  constructor(private alertServices: AlertService,
    private searchLocationService: SearchLocationService,
    private modalRef: BsModalRef,
    private fb: FormBuilder,
    private http: HttpClient, private alertService: AlertService) {

  }

  ngOnInit(): void {
    this.getKeywords();
    this.locationForm = this.fb.group({
      sector: [''],
      location: ['']
    });

      this.getSectorData()
  }

  getSectorData() {
    this.searchLocationService.getSectorData().subscribe((response: any) => {
      this.sectors = response
    })
  }

  exportData(): void {
    // /export/all-data?location=thane&sector=1
    this.params = this.params.delete('location');
    this.params = this.params.delete('sector');
  
    // Append 'location' if a value exists
    const locationValue = this.locationForm.get('location')?.value;
    if (locationValue) {
      this.params = this.params.append('location', locationValue);
    }

    const sectorValue = this.locationForm.get('sector')?.value;
    if (sectorValue) {
      this.params = this.params.append('sector', sectorValue);
    }

    this.http
    .get(`${environment.baseUrl}/export/all-data`, {
      params: this.params,
      responseType: 'blob', // Response type is blob for binary data
    }) // Response type is blob for binary data
    .subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'companies_list.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url); 
      this.alertService.success('Data exported successfully', this.alertOptions);
      this.modalRef.onHidden?.next(true);
      this.modalRef.hide();
    }, (error) => {
      this.alertService.warn(
        error.error.message,
        this.alertOptions
      );
   });
  }

  getUserRole(){
    this.userRole = sessionStorage.getItem('userRoles');
  }

  
  selectedDataKeywords(data: Array<MultiSelectData>) {
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
    })
  }

  onErrorScope(){
    this.showError = true;
  }

  close() {
    this.modalRef.onHidden?.next(false);
    this.modalRef.hide();
  }
}
