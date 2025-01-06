import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AlertOptions } from '../../model/alert.model';
import { KeyConfig } from '../../model/key-config';
import { AlertService } from '../../service/alert.service';
import { KeyConfigService } from '../../service/key-config.service';
import { KeyBindService } from '../../service/key-bind.service';

@Component({
  selector: 'app-bind-key',
  templateUrl: './bind-key.component.html',
  styleUrls: ['./bind-key.component.scss']
})
export class BindKeyComponent {
  cardDivHeight!: string;
  divHeight!: number;
  keybindForm!: FormGroup;
  params: HttpParams = new HttpParams();
  label: String = "Save";
  alertOptions: AlertOptions = { autoClose: true, keepAfterRouteChange: true };
  keys:{ id: number,name: string,key:string,active: boolean}[]=[];

  constructor(private router: Router,
    private modalRef: BsModalRef,
    private fb: FormBuilder,
    private alertService: AlertService,
    private keyBindService: KeyBindService,
  ) {
    this.keybindForm = this.initForm();
  }

  ngOnInit() {

    this.keyBindService.getAll().subscribe((response: any) => {
      this.keys=response;
    });
    this.keyBindService.get().subscribe((response:any)=>{
      this.keybindForm.patchValue(response);
    })
  }

  initForm(): FormGroup {
    return this.fb.group({
      id: ["",Validators.required],
      name: [""],
      active: [false],
    })
  }

  bindKey() {
      this.keyBindService.bind(this.keybindForm.get('id')?.value).subscribe((response: any) => {
        this.keybindForm.patchValue(response);
        this.alertService.success('Key binded successfully', this.alertOptions);
        this.modalRef.onHidden?.next(true);
        this.modalRef.hide();
      })
   
  }

  close() {
    this.modalRef.onHidden?.next(false);
    this.modalRef.hide();
  }

  changeDeviceValue() {
    this.divHeight = window.innerHeight;
    this.divHeight = this.divHeight * 0.85;
    this.cardDivHeight = this.divHeight + 'px';
  }
}
