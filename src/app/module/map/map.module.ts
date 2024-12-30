import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { SearchLocationComponent } from './component/search-location/search-location.component';
import { SearchLocationService } from './service/search-location.service';


@NgModule({
  declarations: [
    KeywordDatatableComponentComponent,
    KeywordFormComponent,
    SearchLocationComponent
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers:[BsModalService, KeywordService, SearchLocationService ]

})
export class MapModule { }
