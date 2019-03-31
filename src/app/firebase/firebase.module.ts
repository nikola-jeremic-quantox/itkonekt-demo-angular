import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireAuthModule } from '@angular/fire/auth';

const firebaseModules = [
  AngularFireAuthModule,
  AngularFireFunctionsModule,
  AngularFirestoreModule,
  AngularFireStorageModule,
  AngularFireMessagingModule
];

@NgModule({
  imports: [
    ...firebaseModules
  ],
  exports: [
    ...firebaseModules
  ]
})
export class FirebaseModule {}
