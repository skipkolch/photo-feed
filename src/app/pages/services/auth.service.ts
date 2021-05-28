import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase';
import '@codetrix-studio/capacitor-google-auth';
import {Plugins} from '@capacitor/core';
import {AngularFirestore} from "@angular/fire/firestore";
import auth = firebase.auth;

export function map(value: any, callback: any) {
  callback(value);
  return value;
}

export interface User {
  uid: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User = null;

  constructor(public angularFireAuth: AngularFireAuth,
              private angularFireStore: AngularFirestore
  ) {
    this.angularFireAuth.onAuthStateChanged((user) => {
      this.currentUser = user;
    });
  }

  async signUpWithEmail(email: string, password: string): Promise<any> {
    return await this.angularFireAuth.createUserWithEmailAndPassword(email, password)
      .then(value => map(value, value => this.successLogin(value.user)));
  }

  signInWithEmail(email: string, password: string): Promise<auth.UserCredential> {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .then(value => map(value, value => this.successLogin(value.user)));
  }

  async signInWithGoogle(): Promise<auth.UserCredential> {
    const googleUser = await Plugins.GoogleAuth.signIn();
    const credential = auth.GoogleAuthProvider.credential(googleUser.authentication.idToken);
    return this.angularFireAuth.signInWithCredential(credential)
      .then(value => map(value, value => this.successLogin(value.user)));
  }

  signOut(): Promise<any> {
    return this.angularFireAuth.signOut();
  }

  private successLogin(user): Promise<any> {
    const uid = user.uid;
    return this.angularFireStore.doc(`users/${uid}`).set({ uid, email: user.email })
  }
}
