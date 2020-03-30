import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user.model';
import { UserService } from 'src/app/_services/user/user.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/_state';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { fillUser, fillToken } from 'src/app/_state/actions';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public user: Partial<User> = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  }
  public isSigningUp: boolean = false
  constructor(private userService: UserService, private store: Store<AppState>, private router: Router, public authService: AuthService) { }

  ngOnInit() {
  }
  signUp(signupForm): void {
    if(signupForm.form.status === 'invalid') return
    this.isSigningUp = true
    const userData = {
      email: this.user.email,
      username: this.user.username,
      password: this.user.password
    }
    this.userService.createUser(userData).toPromise()
      .then(response => {
        if (response) {
          this.userService.login(userData).toPromise()
            .then(loginResponse => {
              this.authService.token = loginResponse.token
              sessionStorage.setItem('token', loginResponse.token)
              this.store.dispatch(fillToken({ payload: response.token }))

              this.userService.getUser(this.user.email).toPromise()
                .then(user => {
                  if (user) {
                    sessionStorage.setItem('user', JSON.stringify(user))
                    this.store.dispatch(fillUser({ payload: user }))
                    setTimeout(() => {
                      this.isSigningUp = false
                      this.router.navigate(['home'])
                    }, 1000);
                  }
                })
            })
        }
      })
      .catch(error => alert("Error trying to sign up. Try again"))
  }
}
