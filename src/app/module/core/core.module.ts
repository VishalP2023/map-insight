import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { LayoutComponent } from './component/layout/layout.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { SharedService } from './service/shared.service';
import { HttpClientModule } from '@angular/common/http';
import { SidebarServiceService } from './service/sidebar-service.service';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    SharedModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    SidebarComponent,
  ],
  providers:[SharedService,SidebarServiceService]
})
export class CoreModule { }
