import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html'
})

export class NoteComponent implements OnInit {

  id: string;
  form = new FormGroup({
    title:    new FormControl('', [Validators.required]),
    message:  new FormControl('', [Validators.required]),
    author:       new FormControl('', [Validators.required]),
    authorId:     new FormControl('', [Validators.required]),
    authorPhoto:  new FormControl('', [Validators.required]),
  });


  constructor(
    public dialogRef: MatDialogRef<NoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.fillForm();
  }

  fillForm() {
    if (this.data.note) {
      this.form.patchValue(this.data.note);
      this.id = this.data.note.id;
    }
    this.form.get('author').setValue(this.data.author.fullname);
    this.form.get('authorId').setValue(this.data.author.userId);
    this.form.get('authorPhoto').setValue(this.data.author.photoUrl);
  }

  onFormSubmit() {
    if (this.form.valid) {
      const formValue = Object.assign(this.form.value);
      this.dialogRef.close({formValue, id: this.id});
    }
  }
}
