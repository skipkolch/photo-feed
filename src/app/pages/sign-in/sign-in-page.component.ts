import {Component, NgZone, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss'],
})
export class SignInPage implements OnInit {
  signInForm: FormGroup;
  submitError: string;
  authRedirectResult: Subscription;

  validation_messages = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 6 characters long.' }
    ]
  };

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private authService: AuthService,
  ) {
    this.signInForm = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ]))
    });
  }

  ngOnInit() {
  }

  signInWithEmail() {
    this.authService.signInWithEmail(this.signInForm.value.email, this.signInForm.value.password)
      .then(_ => this.redirectLoggedUserToProfilePage())
      .catch(error => this.submitError = error.message);
  }

  redirectLoggedUserToProfilePage() {
    this.ngZone.run(() => this.router.navigate(['tabs']));
  }

  googleSignIn() {
    this.authService.signInWithGoogle()
      .then(_ => this.redirectLoggedUserToProfilePage())
      .catch((error) => console.log(error));
  }
}
