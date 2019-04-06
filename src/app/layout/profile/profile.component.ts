import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AuthorComponent } from 'src/app/dialogs/author/author.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user;
  author;
  @Input() isLoggedOut: boolean;
  dialogRef: MatDialogRef<any>;

  constructor(
      private router: Router,
      private apiService: ApiService,
      private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.generateUser();
    this.getAuthor();
  }

  generateUser() {
    const user = localStorage.getItem('firebase_user');
    this.user = JSON.parse(user);
  }

  getAuthor() {
    const id = this.user && this.user.userId;
    this.apiService.getSingleItem('authors', id).subscribe(
      author => {
        this.author = author;
      }
    );
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

  createAuthor() {
    this.dialogRef = this.dialog.open(AuthorComponent, {
      width: '600px',
      data: {
        title: 'Become an Author!',
        user: this.user
      }
    });
    this.subscribeToDialogData();
  }

  editAuthor() {
    this.dialogRef = this.dialog.open(AuthorComponent, {
      width: '600px',
      data: {
        title: 'Edit Author!',
        user: this.author
      }
    });
    this.subscribeToDialogData();
  }

  removeAuthor() {
    const id = this.user.userId;
    this.apiService.deleteItem('authors', id);
  }

  subscribeToDialogData() {
    this.dialogRef.afterClosed().subscribe(doc => {
      if (doc) {
        const id = this.user.userId;
        this.apiService.createItemWithId('authors', doc, id);
      }
    });
  }

}
