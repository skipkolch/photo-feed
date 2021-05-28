import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Photo} from "./cloud-storage.service";

export const LIKES_STORE_KEY = 'likes'

@Injectable({
  providedIn: 'root'
})
export class LikesStorageService {

  constructor(private angularFireStore: AngularFirestore) {
  }

  getLikes(id: string): Observable<number> {
    return this.likesCollection(id).valueChanges()
      .pipe(map(collection => collection.length))
  }

  //*
  getLikePhotos(user: string): Observable<Photo[]> {
    return this.angularFireStore.collection<Photo>(`users/${user}/likes`).valueChanges({ idField: 'id' });
  }

  deleteLikes(id: string) {
    return this.angularFireStore.collection(LIKES_STORE_KEY).doc(id).delete();
  }

  isLike(id: string, user: string): Observable<boolean> {
    return this.likesCollection(id).valueChanges({ idField: 'userId' }).pipe(
      map(c => c.findIndex(item => item.userId === user, 0)),
      map(index => index >= 0)
    )
  }

  async addLike(id: string, user: string) {
    await this.angularFireStore.collection(LIKES_STORE_KEY).doc(id).set({});
    await this.likesCollection(id).doc(user).set({});
  }

  async removeLike(id: string, user: string) {
    await this.likesCollection(id).doc(user).delete();
  }

  async initLikes(id: string) {
    await this.angularFireStore.collection(LIKES_STORE_KEY).doc(id).set({});
  }

  private likesCollection(id: string) {
    return this.angularFireStore.collection(`${LIKES_STORE_KEY}/${id}/users`);
  }
}
