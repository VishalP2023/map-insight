import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapRoutingModule } from './map-routing.module';
import { CoreModule } from '../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SharedModule } from '../shared/shared.module';
import { KeywordDatatableComponentComponent } from './component/keyword-datatable.component/keyword-datatable.component.component';
import { KeywordFormComponent } from './component/keyword-form/keyword-form.component';
import { KeywordService } from './service/keyword.service';


@NgModule({
  declarations: [
    KeywordDatatableComponentComponent,
    KeywordFormComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    MapRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
    
  ],
  exports:[ KeywordDatatableComponentComponent,
    KeywordFormComponent],
  providers:[BsModalService,KeywordService]

})
export class MapModule { }
