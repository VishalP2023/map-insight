import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../core/component/layout/layout.component';
import { KeywordDatatableComponentComponent } from './component/keyword-datatable.component/keyword-datatable.component.component';
import { SearchLocationComponent } from './component/search-location/search-location.component';
import { SectorComponent } from './component/sector/sector.component';
import { GeocodeDatatableComponent } from './component/geocode-datatable/geocode-datatable.component';
import { GeocodeComponent } from './component/geocode/geocode.component';
import { DasboardComponent } from './component/dasboard/dasboard.component';

const routes: Routes = [
  {path: "map",component: LayoutComponent,
    children:[
      {
        path:'keyword-datatable',
        component:KeywordDatatableComponentComponent
      },
      {
        path:'search-location',
        component:SearchLocationComponent
      },
      {
        path:'sector',
        component:SectorComponent
      },
      {
        path:'geo-code',
        component:GeocodeDatatableComponent
      }, 
      {
        path:'dashboard',
        component: DasboardComponent
      },       
    ]
  },
  {path: "",redirectTo: "map/dashboard", pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule { }
