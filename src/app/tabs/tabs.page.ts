import { Component } from '@angular/core';
import {PhotoService} from "../pages/services/photo.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private photoService: PhotoService, private router: Router) {}


  takePhoto() {
    this.photoService.takePhoto();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}
