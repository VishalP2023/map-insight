import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../core/component/layout/layout.component';
import { TestComponent } from '../core/component/test/test.component';
import { KeywordDatatableComponentComponent } from './component/keyword-datatable.component/keyword-datatable.component.component';

const routes: Routes = [
  {path: "map",component: LayoutComponent,
    children:[
      {
        path:'keyword-datatable',
        component:KeywordDatatableComponentComponent
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
