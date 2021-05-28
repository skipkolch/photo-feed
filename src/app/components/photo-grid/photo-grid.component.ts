import {Component, Input, OnInit} from '@angular/core';
import {Photo} from "../../pages/services/cloud-storage.service";
import {CardInfoComponent} from "../card-info/card-info.component";
import {ModalController} from "@ionic/angular";
import {Observable} from "rxjs";

@Component({
  selector: 'app-photo-grid',
  templateUrl: './photo-grid.component.html',
  styleUrls: ['./photo-grid.component.scss'],
})
export class PhotoGridComponent implements OnInit {
  photos: Photo[] = []
  @Input() photosObservable: Observable<Photo[]>

  constructor(private modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.photosObservable.subscribe(p => {
      console.log("LIKES", p);
      this.photos = p;
    })
  }

  async openPhoto(photo: Photo) {
    let photoInfoModal = await this.modalCtrl.create({
      component: CardInfoComponent,
      cssClass: 'photo-info',
      componentProps: {
        photo: photo
      }
    });
    await photoInfoModal.present();
  }
}
