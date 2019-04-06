import { AngularFireModule } from '@angular/fire';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FirebaseModule } from './firebase/firebase.module';
import { LayoutModule } from './layout/layout.module';

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './auth/login/login.component';
import { AuthorComponent } from './dialogs/author/author.component';
import { NoteComponent } from './dialogs/note/note.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AuthorComponent,
    NoteComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase, 'It Konekt Demo'),
    FirebaseModule,
    LayoutModule
  ],
  entryComponents: [AuthorComponent, NoteComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
