import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AlertService } from '../../service/alert.service';
import { KeywordService } from 'src/app/module/map/service/keyword.service';
import { HttpParams } from '@angular/common/http';
import { AlertOptions } from '../../model/alert.model';
import { KeyConfigService } from '../../service/key-config.service';
import { KeyConfig } from '../../model/key-config';

@Component({
  selector: 'app-key-config',
  templateUrl: './key-config.component.html',
  styleUrls: ['./key-config.component.scss']
})
export class KeyConfigComponent {

  keywordId!: number;
  cardDivHeight!: string;
  divHeight!: number;
  keyconfigForm!: FormGroup;
  params: HttpParams = new HttpParams();
  label: String = "Save";
  alertOptions: AlertOptions = { autoClose: true, keepAfterRouteChange: true };

  constructor(private router: Router,
    private modalRef: BsModalRef,
    private fb: FormBuilder,
    private alertService: AlertService,
    private keyConfigService: KeyConfigService,
  ) {
    this.keyconfigForm = this.initForm();
  }

  ngOnInit() {
  }

  initForm(): FormGroup {
    return this.fb.group({
      id: [""],
      key: ["",Validators.required],
      name: ["",Validators.required],
    })
  }

  saveData() {

      this.keyConfigService.create(this.keyconfigForm.value).subscribe((response: KeyConfig) => {
        this.alertService.success('Record added successfully', this.alertOptions);
        this.modalRef.onHidden?.next(true);
        this.modalRef.hide();
      })
   
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
