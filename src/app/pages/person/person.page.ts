import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-person',
  templateUrl: './person.page.html',
  styleUrls: ['./person.page.scss'],
})
export class PersonPage implements OnInit {

  constructor(private authService : AuthService, private router: Router) { }

  ngOnInit() {
  }

  async logOut() {
    await this.authService.signOut();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}
