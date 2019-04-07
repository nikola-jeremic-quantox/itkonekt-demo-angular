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
  author: any;
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
    this.getAuthor();
  }

  getNotes() {
    this.notes$ = this.apiService.getAllItems('notes');
  }

  createNote() {
    this.dialogRef = this.dialog.open(NoteComponent, {
      width: '600px',
      data: {
        title: 'Create new Note',
        author: this.author
      }
    });
    this.subscribeToDialogData();
  }

  deleteNote(note) {
    this.apiService.deleteItem('notes', note.id);
  }

  editNote(note) {
    this.dialogRef = this.dialog.open(NoteComponent, {
      width: '600px',
      data: {
        title: 'Edit Note',
        note,
        author: this.author
      }
    });
    this.subscribeToDialogData();
  }

  getAuthor() {
    const id = this.user && this.user.userId;
    this.apiService.getSingleItem('authors', id).subscribe(
      author => {
        this.author = author;
      }
    );

  }

  subscribeToDialogData() {
    this.dialogRef.afterClosed().subscribe(object => {
      if (object && object.id) {
        const id = object.id;
        this.apiService.updateItem('notes', object.formValue, id);
      } else if (object) {
        this.apiService.createItem('notes', object.formValue);
      }
    });
  }
}
