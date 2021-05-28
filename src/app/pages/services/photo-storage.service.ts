import {Injectable} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/storage";
import {AuthService} from "./auth.service";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {distinct, map, mergeMap} from "rxjs/operators";
import {Observable} from "rxjs";
import {DocumentChangeAction} from "@angular/fire/firestore/interfaces";

export const IMAGES_STORE_KEY = 'files'
export const PHOTOS_STORE_KEY = 'photos'

export interface Photo {
  id: string;
  fileName: string;
  user: string;
  time: number;
  url: string;
}

export interface UserPhotos {
  userUid: string;
  photos: Photo[];
}

function photo(action): Photo {
  const data = action.payload.doc.data();
  const id = action.payload.doc.id;
  return { id: id, fileName: data.fileName, user: data.user, time: data.time, url: data.url } as Photo;
}

@Injectable({
  providedIn: 'root'
})
export class PhotoStorageService {
  changes: number = 0;

  constructor(private angularFireStorage: AngularFireStorage,
              private angularFireStore: AngularFirestore,
              private authService: AuthService) {

  }

  public photosByUserUid(uid: string): Observable<Photo[]> {
    return this.angularFireStore.collection<Photo>(`photos/${uid}/items`).valueChanges({ idField: 'id' })
  }

  public async uploadFile(file: Blob) {
    const randomId = Math.random().toString(36).substring(2, 8);
    const time = new Date().getTime();
    const fileName = `${IMAGES_STORE_KEY}/${time}_${randomId}`;
    const uploadTask = this.angularFireStorage.upload(fileName, file);
    uploadTask.percentageChanges().subscribe(change => this.changes = change);

    uploadTask.then(async result => {
      const user = this.authService.currentUser;

      await this.angularFireStore.collection(`${PHOTOS_STORE_KEY}`).doc(`${user.uid}`).set({})
      await this.angularFireStore.collection(`${PHOTOS_STORE_KEY}/${user.uid}/items`).add(
        { fileName: fileName, user: user.uid, time: time, url: await result.ref.getDownloadURL() } as Photo
      )
    });
  }

  public percentageChanges(): number {
    return this.changes;
  }

  public resetPercentage() {
    this.changes = 0;
  }

  public loadPhotos(): Observable<Photo> {
    return this.photoChanges(uid => this.itemsInPhotoByUid(uid).snapshotChanges(['added']));
  }

  public deletePhotos(): Observable<Photo> {
    return this.photoChanges(uid => this.itemsInPhotoByUid(uid).stateChanges(['removed']));
  }

  public async deletePhoto(photo: Photo): Promise<any> {
    await this.angularFireStore.collection(`photos/${photo.user}/items`).doc(photo.id).delete();
    return this.angularFireStorage.storage.ref().child(photo.fileName).delete();
  }

  private photos(): AngularFirestoreCollection<UserPhotos> {
    return this.angularFireStore.collection<UserPhotos>(PHOTOS_STORE_KEY);
  }

  private itemsInPhotoByUid(uid: string): AngularFirestoreCollection<Photo> {
    return this.angularFireStore.doc(`${PHOTOS_STORE_KEY}/${uid}`).collection('items');
  }

  private photoChanges(project: (value: string, index: number) => Observable<DocumentChangeAction<Photo>[]>): Observable<Photo> {
    return this.photos().snapshotChanges()
      .pipe(
        mergeMap(action => action.map(obj => obj.payload.doc.id)),
        map(project),
        mergeMap(obj => obj.pipe(mergeMap(actions => actions.map(action => photo(action))))),
        distinct(obj => obj.id)
      )
  }
}
