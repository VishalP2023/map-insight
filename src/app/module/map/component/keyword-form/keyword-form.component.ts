import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AlertOptions } from 'src/app/module/shared/model/alert.model';
import { AlertService } from 'src/app/module/shared/service/alert.service';
import { KeywordService } from '../../service/keyword.service';

@Component({
  selector: 'app-keyword-form',
  templateUrl: './keyword-form.component.html',
  styleUrls: ['./keyword-form.component.scss']
})
export class KeywordFormComponent {

  keywordId!: number;
  cardDivHeight!: string;
  divHeight!: number;
  keywordForm!: FormGroup;
  params: HttpParams = new HttpParams();
  label: String = "Save";
  alertOptions: AlertOptions = { autoClose: true, keepAfterRouteChange: true };

  constructor(private router: Router,
    private modalRef: BsModalRef,
    private fb: FormBuilder,
    private alertService: AlertService,
    private keywordService: KeywordService,
  ) {
    this.keywordForm = this.initForm();
  }

  ngOnInit() {
    if (this.keywordId) {
      console.log(this.keywordId);
      this.label = "Update"
      this.keywordService.getById(this.keywordId).subscribe((response) => {
        this.keywordForm.patchValue(response);
      })
    }

  }

  initForm(): FormGroup {
    return this.fb.group({
      id: [""],
      code: [""],
      name: [""],
    })
  }

  saveData() {
    if (this.label !== "Update") {
      this.keywordService.create(this.keywordForm.value).subscribe((response: any) => {
        this.alertService.success('Record added successfully', this.alertOptions);
        this.modalRef.onHidden?.next(true);
        this.modalRef.hide();
      })
    } else {
      this.keywordService.update(this.keywordForm.value).subscribe((response: any) => {
        this.alertService.success('Record updated successfully', this.alertOptions);
        this.modalRef.onHidden?.next(true);
        this.modalRef.hide();
       
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
