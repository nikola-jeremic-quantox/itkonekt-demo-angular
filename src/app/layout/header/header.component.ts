import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogged: boolean;
  @Output() toggleClicked = new EventEmitter();
  @Output() logoutEvent = new EventEmitter();

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    const token = localStorage.getItem('firebase_token');
    this.isLogged = !!token;
  }

  onLogin() {
    this.router.navigateByUrl('login');
  }

  onLogout() {
    localStorage.removeItem('firebase_token');
    localStorage.removeItem('firebase_user');
    this.isLogged = false;
    this.logoutEvent.emit();
  }

  onToggle() {
    this.toggleClicked.emit();
  }
}
