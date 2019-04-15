import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private db: AngularFirestore) {}

  getAllItems(collection) {
    return this.db
      .collection(collection, ref => ref.orderBy('updated') )
      .snapshotChanges()
      .pipe(
        map(snaps =>
          snaps.map(snap => {
            const doc = snap.payload.doc;
            return {...doc.data(), id: doc.id, };
          })
        )
      );
  }

  getSingleItem(collection, id) {
    const endpoint = `${collection}/${id}`;
    return this.db
      .doc(endpoint)
      .snapshotChanges()
      .pipe(
        map(snap => {
          const doc = snap.payload;
          return { ...doc.data(), id: doc.id };
        })
      );
  }

  createItem(collection, document) {
    const date = firebase.firestore.FieldValue.serverTimestamp();
    return this.db
      .collection(collection)
      .add({ ...document,
        created: date,
        updated: date
      });
  }

  createItemWithId(collection, document, id) {
    const date = firebase.firestore.FieldValue.serverTimestamp();
    return this.db
      .collection(collection)
      .doc(id)
      .set({ ...document,
        created: date,
        updated: date
      });
  }

  updateItem(collection, document, id) {
    const date = firebase.firestore.FieldValue.serverTimestamp();
    return this.db
      .doc(`${collection}/${id}`)
      .update({ ...document, updated: date });
  }

  deleteItem(collection, id) {
    return this.db
      .doc(`${collection}/${id}`)
      .delete();
  }
}
