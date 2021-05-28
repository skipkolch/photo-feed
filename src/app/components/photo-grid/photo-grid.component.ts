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
  @Input() pageName: string;

  constructor(private modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.photosObservable.subscribe(p => {
      console.log(`Grid in ${this.pageName}`, p);
      this.photos = p;
    })
  }

  async openPhoto(photo: Photo) {
    console.log(photo);
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
