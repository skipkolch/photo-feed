import {Injectable} from '@angular/core';
import {CanLoad, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {filter, map, take} from "rxjs/operators";
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {
  }

  canLoad(): Observable<boolean> | boolean {
    return true;
    // return this.authService.isAuthenticated.pipe(
    //   filter(val => val !== null),
    //   take(1),
    //   map(isAuthenticated => {
    //     console.log('Found previous token, automatic login');
    //     if (isAuthenticated) {
    //       this.router.navigateByUrl('/tabs', { replaceUrl: true });
    //     } else {
    //       return true;
    //     }
    //   })
    // );
  }
}
