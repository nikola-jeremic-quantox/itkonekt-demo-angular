import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private db: AngularFirestore) {}

  getAllItems(collection) {
    return this.db
      .collection(collection)
      .snapshotChanges()
      .pipe(
        map(snaps =>
          snaps.map(snap => {
            const item = snap.payload.doc;
            return {
              ...item.data(),
              id: item.id,
            };
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
          const item = snap.payload;
          return {
            ...item.data(),
            id: item.id,
          };
        })
      );
  }

  createItem(collection, document) {
    return this.db
      .collection(collection)
      .add(document);
  }

  createItemWithId(collection, document, id) {
    return this.db
      .collection(collection)
      .doc(id)
      .set(document);
  }

  updateItem(collection, document, id) {
    return this.db
      .doc(`${collection}/${id}`)
      .update(document);
  }

  deleteItem(collection, id) {
    return this.db
      .doc(`${collection}/${id}`)
      .delete();
  }
}
