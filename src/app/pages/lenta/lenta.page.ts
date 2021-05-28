import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {CloudStorageService, Photo} from "../services/cloud-storage.service";
import {ModalController} from "@ionic/angular";
import {CardInfoComponent} from "../../components/card-info/card-info.component";


@Component({
  selector: 'app-lenta',
  templateUrl: './lenta.page.html',
  styleUrls: ['./lenta.page.scss'],
})
export class LentaPage implements OnInit {
  photos: Photo[] = [];
  defaultImage = './assets/white.jpg'
  deltaLimit = 5;
  limit = this.deltaLimit;


  constructor(private authService: AuthService,
              private router: Router,
              public cloudStorageService: CloudStorageService,
              public modalCtrl: ModalController) {

  }

  comparePhoto(a: Photo, b: Photo) {
    if (a.time > b.time)
      return -1;
    if (a.time < b.time)
      return 1;
    return 0;
  };

  ngOnInit() {
    this.cloudStorageService.loadPhotos()
      .subscribe(newPhoto => {
        this.photos.push(newPhoto);
        this.photos = this.photos.sort(this.comparePhoto);
        this.cloudStorageService.resetPercentage();
      });

    this.cloudStorageService.deletePhotos()
      .subscribe(deletedPhoto => this.delete(deletedPhoto));
  }

  async logout() {
    await this.authService.signOut();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  loadMore($event: any) {
    if (this.limit < this.photos.length) {
      this.limit += this.deltaLimit;
    }
    $event.target.complete();
  }

  async presentInfo(photo: Photo) {
    let photoInfoModal = await this.modalCtrl.create({
      component: CardInfoComponent,
      cssClass: 'photo-info',
      componentProps: {
        photo: photo
      }
    });
    await photoInfoModal.present();
  }

  private delete(deletedPhoto: Photo) {
    const index = this.photos.findIndex(item => item.id === deletedPhoto.id)
    if (index > -1) {
      this.photos.splice(index, 1);
    }
  }
}
