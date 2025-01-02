import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  isCollapsed = false; // Toggle for sidebar collapse
  userRole: string | null = ''; // Role from sessionStorage

  // Define links for admin and user roles
  adminLinks = [
    { label: 'Key Word', route: '/map/map/keyword-datatable', icon: 'fa fa-line-chart' },  // fa-chart-line -> fa-line-chart
    { label: 'Search Location', route: '/map/map/search-location', icon: 'fa fa-cogs' },  
    { label: 'Sector', route: '/map/map/sector', icon: 'fa fa-users' },  // fa-users remains the same 
    { label: 'Geo Code', route: '/map/map/geo-code', icon: 'fa fa-cogs' },  
  ];
  
  userLinks = [
    { label: 'Search Location', route: '/map/map/search-location', icon: 'fa fa-cogs' },  
    { label: 'Geo Code', route: '/map/map/geo-code', icon: 'fa fa-cogs' },  
  ];

  ngOnInit(): void {
    // Fetch the role from sessionStorage
    this.userRole = sessionStorage.getItem('userRoles');
  }

  // Toggle sidebar collapse
  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}

