import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AlertOptions } from 'src/app/module/shared/model/alert.model';
import { AlertService } from 'src/app/module/shared/service/alert.service';
import { KeywordService } from '../../service/keyword.service';
import { GeocodeService } from '../../service/geocode.service';

@Component({
  selector: 'app-geocode',
  templateUrl: './geocode.component.html',
  styleUrls: ['./geocode.component.scss']
})
export class GeocodeComponent {
 keywordId!: number;
  cardDivHeight!: string;
  divHeight!: number;
  GeoCodeForm!: FormGroup;
  params: HttpParams = new HttpParams();
  label: String = "Save";
  alertOptions: AlertOptions = { autoClose: true, keepAfterRouteChange: true };

  constructor(private router: Router,
    private modalRef: BsModalRef,
    private fb: FormBuilder,
    private alertService: AlertService,
    private geocodeService: GeocodeService,
  ) {
    this.GeoCodeForm = this.initForm();
  }

  ngOnInit() {

  }

  initForm(): FormGroup {
    return this.fb.group({
      id: [""],
      address: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.pattern('^[a-zA-Z0-9 ,]+$')]]
    })
  }

  saveData() {
    if (this.label !== "Update") {
      this.geocodeService.create( this.GeoCodeForm.value.address).subscribe((response: any) => {
        this.alertService.success('Record added successfully', this.alertOptions);
        this.modalRef.onHidden?.next(true);
        this.modalRef.hide();
      }, (error) => {
         //alert(error.error.message);
         this.alertService.warn(
           error.error.message,
           this.alertOptions
         );
      })
    } 
  }


  close() {
    this.modalRef.onHidden?.next(false);
    this.modalRef.hide();
  }

  changeDeviceValue() {
    this.divHeight = window.innerHeight
    this.divHeight = this.divHeight * 0.85
    this.cardDivHeight = this.divHeight + 'px'
  }
}