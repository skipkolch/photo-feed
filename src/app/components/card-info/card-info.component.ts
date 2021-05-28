import {Component, Input, OnInit} from '@angular/core';
import {PhotoStorageService, Photo} from "../../pages/services/photo-storage.service";
import {ModalController} from "@ionic/angular";
import {UserStorageService} from "../../pages/services/user-storage.service";
import {AuthService} from "../../pages/services/auth.service";
import {LikesStorageService} from "../../pages/services/likes-storage.service";

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss'],
})
export class CardInfoComponent implements OnInit {
  @Input() photo: Photo;
  isOwner: boolean = false;
  isLiked: boolean = false;
  likes: number = 0;
  userEmail: string = '';


  constructor(public modalCtrl: ModalController,
              private userStorageService: UserStorageService,
              private storageService: PhotoStorageService,
              private authService: AuthService,
              private likesService: LikesStorageService) {
  }

  ngOnInit() {
    this.isOwner = this.photo.user === this.authService.currentUser.uid;
    this.likesService.isLike(this.photo.id, this.authService.currentUser.uid)
      .subscribe(like => this.isLiked = like);
    this.userStorageService.getUser(this.photo.user)
      .subscribe(userInfo => this.userEmail = userInfo.email);
    this.likesService.likesNumberById(this.photo.id)
      .subscribe(likes => this.likes = likes);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  deletePhoto() {
    this.storageService.deletePhoto(this.photo).then(_ => {
      this.likesService.deleteLikesById(this.photo.id).then(_ =>
        this.userStorageService.removeLike(this.photo, this.authService.currentUser.uid))
      this.dismiss()
    });
  }

  like() {
    this.likesService.addLike(this.photo.id, this.authService.currentUser.uid).then(_ =>
      this.userStorageService.addLike(this.photo, this.authService.currentUser.uid)
    )
  }

  unlike() {
    this.likesService.deleteLike(this.photo.id, this.authService.currentUser.uid).then(_ =>
      this.userStorageService.removeLike(this.photo, this.authService.currentUser.uid)
    )
  }
}
