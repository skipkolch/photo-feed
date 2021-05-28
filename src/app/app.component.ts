import {Component} from '@angular/core';
import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';
import {Platform} from '@ionic/angular';
import {Router} from '@angular/router';
import {AuthService} from './pages/services/auth.service';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private screenOrientation: ScreenOrientation,
              private router: Router,
              private platform: Platform,
              private storage: Storage,
              private authService: AuthService,
  ) {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    storage.create().then(_ => this.initialize());
  }


  initialize() {
    // this.platform.ready().then(() =>
    //   this.authService.authState.subscribe(
    //     state => this.router.navigate(state ? ['tabs'] : ['sign-in'])
    //   )
    // );
  }
}
