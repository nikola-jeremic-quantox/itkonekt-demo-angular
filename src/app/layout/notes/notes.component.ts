import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Observable } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { NoteComponent } from 'src/app/dialogs/note/note.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  notes$: Observable<any>;
  user: any;
  defaultImage = 'url(../../../assets/images/default-user.png)';
  dialogRef: MatDialogRef<any>;

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getUser();
    this.getNotes();
  }

  getUser() {
    const storageUser = localStorage.getItem( 'firebase_user');
    this.user = JSON.parse(storageUser);
  }

  getNotes() {
    this.notes$ = this.apiService.getAllItems('notes');
  }

  createNote() {
    this.dialogRef = this.dialog.open(NoteComponent, {
      width: '600px',
      data: {
        user: this.user
      }
    });
  }

}
