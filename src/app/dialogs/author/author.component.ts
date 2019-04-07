import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { last, concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html'
})

export class AuthorComponent implements OnInit {

  imageFile: File;
  imagePreview;
  uploadPercent: number;

  form = new FormGroup({
    userId:     new FormControl('', [Validators.required]),
    fullname:   new FormControl('', [Validators.required]),
    email:      new FormControl('', [Validators.required]),
    country:    new FormControl('', []),
    city:       new FormControl('', []),
    photoUrl:   new FormControl('', [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<AuthorComponent>,
    private storage: AngularFireStorage,
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

  onImagePicked(event: Event) {
    this.imageFile = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => { this.imagePreview = reader.result; };
    reader.readAsDataURL(this.imageFile);
    const authorId = this.form.value.userId;
    const filename = this.imageFile.name ;
    const filePath = `authors/${authorId}/${filename}`;
    const task = this.storage.upload(filePath, this.imageFile);

    task.percentageChanges().subscribe(
      res => this.uploadPercent = res
    );

    task.snapshotChanges()
    .pipe(
      last(),
      concatMap( () => this.storage.ref(filePath).getDownloadURL() )
    ).subscribe(
      res => this.form.get('photoUrl').setValue(res)
    );
  }

  postImage() {
      const formData = new FormData();
      const filetype = 'image';
      const file = this.imageFile ;
      const filename = this.imageFile.name ;
      formData.append(filetype, file, filename);
  }
}
