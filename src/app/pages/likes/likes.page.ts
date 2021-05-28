import {Component, OnInit} from '@angular/core';
import {LikesStorageService} from "../services/likes-storage.service";
import {AuthService} from "../services/auth.service";
import {Observable} from "rxjs";
import {Photo} from "../services/photo-storage.service";

@Component({
  selector: 'app-likes',
  templateUrl: './likes.page.html',
  styleUrls: ['./likes.page.scss'],
})
export class LikesPage implements OnInit {

  constructor(private likesStorageService: LikesStorageService,
              private authService: AuthService) {
  }

  ngOnInit() {
  }

  photos(): Observable<Photo[]> {
    return this.likesStorageService.likedPhotosByUserUid(this.authService.currentUser.uid)
  }

}
