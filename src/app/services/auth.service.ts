import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Platform} from '@ionic/angular';
import firebase from 'firebase';
import {BehaviorSubject, from, Observable} from 'rxjs';
import '@codetrix-studio/capacitor-google-auth';
import {Plugins} from '@capacitor/core';
import auth = firebase.auth;
import {AngularFirestore} from "@angular/fire/firestore";

const { Storage } = Plugins;
const TOKEN_KEY = 'token-uid';

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
  //public isAuthenticated = new BehaviorSubject(false);

  constructor(
    public angularFireAuth: AngularFireAuth,
    public platform: Platform,
    private angularFireStore: AngularFirestore
  ) {
    this.angularFireAuth.onAuthStateChanged((user) => {
      this.currentUser = user;
    });
    this.loadToken();
  }

  async loadToken() {
    // const token = await Storage.get({ key: TOKEN_KEY });
    // if (token && token.value) {
    //   console.log('set token: ', token.value);
    //   this.isAuthenticated.next(true);
    // } else {
    //   this.isAuthenticated.next(false);
    // }
  }

  async signUpWithEmail(email: string, password: string): Promise<any> {
    // return this.angularFireAuth.createUserWithEmailAndPassword(email, password)
    //   .then(value => map(value, value => this.successLogin(value.user)));
    const credential = await this.angularFireAuth.createUserWithEmailAndPassword(email, password);
    const uid = credential.user.uid;
    return this.angularFireStore.doc(
      `users/${uid}`
    ).set({
      uid,
      email: credential.user.email,
    })
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
    return this.angularFireAuth.signOut().then(_ => {
      //Storage.remove({ key: TOKEN_KEY });
      //this.isAuthenticated.next(false);
    });
  }

  private successLogin(user) {
    console.log(user);
    // Storage.set({ key: TOKEN_KEY, value: user.uid })
    //   .then(_ => this.isAuthenticated.next(true));
  }
}
