import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Photo} from "./photo-storage.service";

export const LIKES_STORE_KEY = 'likes'

@Injectable({
  providedIn: 'root'
})
export class LikesStorageService {

  constructor(private angularFireStore: AngularFirestore) {
  }

  public likesNumberById(id: string): Observable<number> {
    return this.likesCollection(id).valueChanges()
      .pipe(map(collection => collection.length))
  }

  public likedPhotosByUserUid(user: string): Observable<Photo[]> {
    return this.angularFireStore.collection<Photo>(`users/${user}/likes`).valueChanges({ idField: 'id' });
  }

  public deleteLikesById(id: string) {
    return this.angularFireStore.collection(LIKES_STORE_KEY).doc(id).delete();
  }

  public async deleteLike(id: string, user: string) {
    await this.likesCollection(id).doc(user).delete();
  }

  public isLike(id: string, user: string): Observable<boolean> {
    return this.likesCollection(id).valueChanges({ idField: 'userId' }).pipe(
      map(c => c.findIndex(item => item.userId === user, 0)),
      map(index => index >= 0)
    )
  }

  public async addLike(id: string, user: string) {
    await this.angularFireStore.collection(LIKES_STORE_KEY).doc(id).set({});
    await this.likesCollection(id).doc(user).set({});
  }

  private likesCollection(id: string) {
    return this.angularFireStore.collection(`${LIKES_STORE_KEY}/${id}/users`);
  }
}
