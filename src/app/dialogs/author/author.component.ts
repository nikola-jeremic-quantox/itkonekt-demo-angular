import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {

  form = new FormGroup({
    userId:     new FormControl('', [Validators.required]),
    fullname:   new FormControl('', [Validators.required]),
    email:      new FormControl('', [Validators.required]),
    country:    new FormControl('', [Validators.required]),
    city:       new FormControl('', [Validators.required]),
    photoUrl:   new FormControl('', [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<AuthorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.fillForm();
  }

  fillForm() {
    this.form.patchValue(this.data.user);
  }

  onFormSubmit() {
    if (this.form.valid) {
      const formValue = Object.assign(this.form.value);
      this.dialogRef.close(formValue);
    }
  }
}
