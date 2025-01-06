import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BindKeyComponent } from 'src/app/module/shared/component/bind-key/bind-key.component';
import { KeyConfigComponent } from 'src/app/module/shared/component/key-config/key-config.component';
import { modalOptionsDialogRighted } from 'src/app/module/shared/model/constants.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  userRole: string | null = ''; // Role from sessionStorage
  username!: string | null;

  // Define links for admin and user roles
  adminLinks = [
    { label: 'Key Word', route: '/map/map/keyword-datatable', icon: 'fa fa-line-chart' },  // fa-chart-line -> fa-line-chart
    { label: 'Sector', route: '/map/map/sector', icon: 'fa fa-users' },  // fa-users remains the same 
    { label: 'Geo Code', route: '/map/map/geo-code', icon: 'fa fa-cogs' },  
    { label: 'Search Location', route: '/map/map/search-location', icon: 'fa fa-map-marker' }
  ];
  
  userLinks = [
    { label: 'Search Location', route: '/map/map/search-location', icon: 'fa fa-map-marker' },  
  ];
  constructor(private router: Router,private modalService:BsModalService) {}

  ngOnInit(): void {
    // Fetch the role from sessionStorage
    this.userRole = sessionStorage.getItem('userRoles');
    this.username = sessionStorage.getItem('username');
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  myKeyConfig() {
    let modalRef: BsModalRef
  modalRef = this.modalService.show(KeyConfigComponent, { ...modalOptionsDialogRighted });
  }

  myKeyBind() {
    let modalRef: BsModalRef
  modalRef = this.modalService.show(BindKeyComponent, { ...modalOptionsDialogRighted });
  }
}

