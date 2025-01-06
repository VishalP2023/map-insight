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
import { SectorComponent } from './component/sector/sector.component';
import { SectorFormComponent } from './component/sector-form/sector-form.component';
import { SectorService } from './service/sector.service';
import { GeocodeComponent } from './component/geocode/geocode.component';
import { GeocodeDatatableComponent } from './component/geocode-datatable/geocode-datatable.component';
import { GeocodeService } from './service/geocode.service';
import { ContactDetailsComponent } from './component/contact-details/contact-details.component';
import { DasboardComponent } from './component/dasboard/dasboard.component';
import { DashboardService } from './service/dashboard.service';

@NgModule({
  declarations: [
    KeywordDatatableComponentComponent,
    KeywordFormComponent,
    SearchLocationComponent,
    SectorComponent,
    SectorFormComponent,
    GeocodeComponent,
    GeocodeDatatableComponent,
    ContactDetailsComponent,
    DasboardComponent
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
  providers:[BsModalService, KeywordService, SearchLocationService,SectorService, GeocodeService, DashboardService]

})
export class MapModule { }
