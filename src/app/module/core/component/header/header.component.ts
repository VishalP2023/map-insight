import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
    { label: 'Search Location', route: '/map/map/search-location', icon: 'fa fa-map-marker' },  
  ];
  
  userLinks = [
    { label: 'Search Location', route: '/map/map/search-location', icon: 'fa fa-map-marker' },  
  ];
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Fetch the role from sessionStorage
    this.userRole = sessionStorage.getItem('userRoles');
    this.username = sessionStorage.getItem('username');
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}

