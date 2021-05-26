import { Component, NgZone, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss'],
})
export class SignUpPage implements OnInit {

  signUpForm: FormGroup;
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
    public router: Router,
    private ngZone: NgZone,
    private authService: AuthService
  ) {
    this.signUpForm = new FormGroup({
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
    this.authService.signUpWithEmail(this.signUpForm.value.email, this.signUpForm.value.password)
      .then(user => {
        console.log(user);
        this.redirectLoggedUserToProfilePage();
      })
      .catch(error => this.submitError = error.message);
  }

  googleSignUp() {
    this.authService.signInWithGoogle()
      .then((user: any) => {
        // if (result.additionalUserInfo) {
        //   this.authService.setProviderAdditionalInfo(result.additionalUserInfo.profile);
        // }
        console.log(user);
        this.redirectLoggedUserToProfilePage();
      }).catch((error) => console.log(error));
  }


  redirectLoggedUserToProfilePage() {
    this.ngZone.run(() => this.router.navigate(['tabs']));
  }
}
