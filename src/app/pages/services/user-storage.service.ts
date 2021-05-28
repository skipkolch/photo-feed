import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {map} from "rxjs/operators";
import {User} from "./auth.service";
import {Observable} from "rxjs";
import {Photo} from "./cloud-storage.service";

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor(private angularFireStore: AngularFirestore) {
  }

  getUser(uid: string): Observable<User> {
    return this.angularFireStore.collection('users').doc(uid)
      .get()
      .pipe(map(value => value.data() as User))
  }

  addLike(photo: Photo, uid: string) {
    return this.angularFireStore.collection(`users/${uid}/likes`).doc(photo.id).set(photo);
  }

  removeLike(photo: Photo, uid: string) {
    return this.angularFireStore.collection(`users/${uid}/likes`).doc(photo.id).delete();
  }

}
