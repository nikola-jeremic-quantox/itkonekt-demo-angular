import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user;
  @Input() isLoggedOut: boolean;

  constructor(private router: Router) { }

  ngOnInit() {
    this.generateUser();
  }

  generateUser() {
    const user = localStorage.getItem('firebase_user');
    this.user = JSON.parse(user);
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

}
