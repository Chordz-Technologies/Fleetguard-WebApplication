import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private router: Router) {}
  
  logout() {
    localStorage.removeItem('admin');
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }
}
