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
    { label: 'Sector', route: '/users', icon: 'fa fa-users' },  // fa-users remains the same
    { label: 'Search Location', route: '/settings', icon: 'fa fa-cogs' }, 
    { label: 'Geo Code', route: '/settings', icon: 'fa fa-cogs' },  
  ];
  
  userLinks = [
    { label: 'Profile', route: '/profile', icon: 'fa fa-user' },  // fa-user remains the same
    { label: 'Tasks', route: '/tasks', icon: 'fa fa-tasks' },  // fa-tasks remains the same
    { label: 'Help', route: '/help', icon: 'fa fa-question-circle' },  // fa-circle-question -> fa-question-circle
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

