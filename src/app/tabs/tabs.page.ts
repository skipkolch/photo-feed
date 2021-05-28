import { Component } from '@angular/core';
import {CameraService} from "../pages/services/camera.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private photoService: CameraService, private router: Router) {}


  takePhoto() {
    this.photoService.takePhoto();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}
