import {Injectable} from '@angular/core';
import {CanLoad, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {filter, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {
  }

  canLoad(): Observable<boolean> | boolean {
    return  true;
    // return this.authService.isAuthenticated.pipe(
    //   filter(val => val !== null),
    //   map(isAuthenticated => {
    //     if (isAuthenticated) {
    //       return true;
    //     } else {
    //       this.router.navigateByUrl('/sign-in', { replaceUrl: true })
    //       return false;
    //     }
    //   })
    // );
  }
}
