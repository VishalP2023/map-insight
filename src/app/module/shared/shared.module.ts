import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './component/alert/alert.component';
import { AlertService } from './service/alert.service';
import { DataTableComponent } from './component/data-table/data-table.component';
import { FormsModule } from '@angular/forms';
import { MultiselectDropDownComponent } from './component/multiselect-drop-down/multiselect-drop-down.component';



@NgModule({
  declarations: [
    AlertComponent,
    DataTableComponent,
    MultiselectDropDownComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[AlertComponent,DataTableComponent,MultiselectDropDownComponent],
  providers:[AlertService]
})
export class SharedModule { }
