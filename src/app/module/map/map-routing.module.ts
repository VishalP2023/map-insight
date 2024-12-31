import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../core/component/layout/layout.component';
import { KeywordDatatableComponentComponent } from './component/keyword-datatable.component/keyword-datatable.component.component';
import { SearchLocationComponent } from './component/search-location/search-location.component';
import { SectorComponent } from './component/sector/sector.component';
import { GeocodeDatatableComponent } from './component/geocode-datatable/geocode-datatable.component';
import { GeocodeComponent } from './component/geocode/geocode.component';

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
      }      
    ]
  },
  {path: "",redirectTo: "map", pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule { }
