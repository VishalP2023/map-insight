import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './component/alert/alert.component';
import { AlertService } from './service/alert.service';
import { DataTableComponent } from './component/data-table/data-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiselectDropDownComponent } from './component/multiselect-drop-down/multiselect-drop-down.component';
import { KeyConfigComponent } from './component/key-config/key-config.component';
import { KeyConfigService } from './service/key-config.service';
import { BindKeyComponent } from './component/bind-key/bind-key.component';
import { KeyBindService } from './service/key-bind.service';



@NgModule({
  declarations: [
    AlertComponent,
    DataTableComponent,
    MultiselectDropDownComponent,
    KeyConfigComponent,
    BindKeyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[AlertComponent,DataTableComponent,MultiselectDropDownComponent,KeyConfigComponent,BindKeyComponent],
  providers:[AlertService,KeyConfigService,KeyBindService]
})
export class SharedModule { }
