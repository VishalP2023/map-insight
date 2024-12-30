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
import { TestComponent } from './component/test/test.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    SidebarComponent,
    TestComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    SidebarComponent,
    TestComponent
  ],
  providers:[SharedService,SidebarServiceService]
})
export class CoreModule { }
