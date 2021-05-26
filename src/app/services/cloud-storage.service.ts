import {Injectable} from '@angular/core';
import firebase from "firebase";

import {ListResult} from "@angular/fire/storage/interfaces";

@Injectable({
  providedIn: 'root'
})
export class CloudStorageService {

  constructor() {
  }

  loadImages(): Promise<ListResult> {
    const storageRef = firebase.storage().ref('images');
    return storageRef.listAll();
  }
}
