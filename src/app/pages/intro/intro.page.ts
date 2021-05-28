import {Component, OnInit, ViewChild} from '@angular/core';
import {IonSlides} from "@ionic/angular";
import {INTRO_KEY} from "../../guards/intro.guard";
import {Router} from "@angular/router";

import {Plugins} from '@capacitor/core';

const { Storage } = Plugins;

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  next() {
    this.slides.slideNext();
  }

  async start() {
    await Storage.set({ key: INTRO_KEY, value: 'true' });
    await this.router.navigateByUrl('/sign-in', { replaceUrl: true });
  }

}
