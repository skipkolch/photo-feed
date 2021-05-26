import {Component} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {CloudStorageService} from "../services/cloud-storage.service";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  cloudFiles = [];
  defaultImage = './assets/icon/favicon.png'
  //image = 'https://twoadver.com/wp-content/uploads/2014/09/adobestock_112482963.jpeg'

  constructor(private authService: AuthService, private router: Router, private cloudStorageService: CloudStorageService) {
    cloudStorageService.loadImages().then(result => {
      result.items.forEach(async ref => {
        this.cloudFiles.push({
          name: ref.name,
          full: ref.fullPath,
          ref,
          url: await ref.getDownloadURL()
        })
      })
    })
  }


  async logout() {
    await this.authService.signOut();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}
