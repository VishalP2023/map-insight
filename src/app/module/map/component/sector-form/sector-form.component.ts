import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MultiSelectData } from 'src/app/module/shared/model/multi-selelect-dropdown.model';
import { AlertService } from 'src/app/module/shared/service/alert.service';
import { SectorService } from '../../service/sector.service';
import { KeywordService } from '../../service/keyword.service';
import { AlertOptions } from 'src/app/module/shared/model/alert.model';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-sector-form',
  templateUrl: './sector-form.component.html',
  styleUrls: ['./sector-form.component.scss']
})
export class SectorFormComponent {

  sectorId!: number;
  cardDivHeight!: string;
  divHeight!: number;
  sectorForm!: FormGroup;
  params: HttpParams = new HttpParams();
  label: String = "Save";
  alertOptions: AlertOptions = { autoClose: true, keepAfterRouteChange: true };
  defaultValue: Array<MultiSelectData> = [];
  dropdownList: any = [];
  showError: boolean =false;

  constructor(private router: Router,
    private modalRef: BsModalRef,
    private fb: FormBuilder,
    private alertService: AlertService,
    private sectorService: SectorService,
    private keywordService:KeywordService
  ) {
    this.sectorForm = this.initForm();
  }

  ngOnInit() {
    this.getKeywords();
    if (this.sectorId) {
      this.label = "Update"
      this.params = this.params.append("id", this.sectorId);
      this.sectorService.getById(this.sectorId).subscribe((response) => {
        response.keywords.forEach((res:any)=>{
          this.defaultValue.push({  id: res.id,name: res.name, displayName:res.name });
        })
        this.sectorForm.patchValue(response);
      })
      console.log(this.dropdownList)
    }

  }

  initForm(): FormGroup {
    return this.fb.group({
      id: [""],
      code: [""],
      name: [""],
      keywords:[[]],
      createdBy: [""],
      createdAt: [""],
      updatedBy: [""],
      updatedAt: [""],
      isDeleted: [""]
    })
  }

  saveData() {
    if (!this.sectorId) {
      this.sectorService.create(this.sectorForm.value).subscribe((response: any) => {
        this.alertService.success('Record added successfully', this.alertOptions);
        this.modalRef.onHidden?.next(true);
        this.modalRef.hide();
      })
    } else {
      console.log(this.sectorForm.value)
      this.sectorService.update(this.sectorForm.value).subscribe((response: any) => {
       
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

  selectedDataKeywords(data: Array<MultiSelectData>) {
    console.log(data)
    if (data?.length > 0) {
      let filterData = data.map((x: MultiSelectData) => x.id);
      console.log(filterData)
      this.sectorForm.controls['keywords'].patchValue(data)
    } else {
      this.sectorForm.controls['keywords'].reset("")
    }
  }

  getKeywords() {
    this.keywordService.getList().subscribe((success: any) => {
      let a: any = []
      let b: any = []
      for (let [keywordId, name] of Object.entries(success)) {
        a.push(name);
        b.push({ name: name, id: keywordId })
      }

      this.dropdownList = a;
      this.sectorForm.controls["keywords"].patchValue(b);
    })
  }

  onErrorScope(){
    this.showError = true;
  }
}
