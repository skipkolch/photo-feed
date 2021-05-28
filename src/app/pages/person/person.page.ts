import {Component, OnInit} from '@angular/core';
import {AuthService, User} from "../services/auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {PhotoStorageService, Photo} from "../services/photo-storage.service";

@Component({
  selector: 'app-person',
  templateUrl: './person.page.html',
  styleUrls: ['./person.page.scss'],
})
export class PersonPage implements OnInit {
  user: User;

  constructor(private authService: AuthService,
              private router: Router,
              private cloudStorage: PhotoStorageService) {
  }

  ngOnInit() {
    this.user = this.authService.currentUser;
  }

  async logOut() {
    await this.authService.signOut();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  personPhotos(): Observable<Photo[]> {
    return this.cloudStorage.photosByUserUid(this.user.uid);
  }
}
