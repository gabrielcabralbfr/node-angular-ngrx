import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user/user.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/_state';
import { fillToken, fillUser } from 'src/app/_state/actions';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public credentials = {
    email: '',
    password: ''
  }
  constructor(private userService: UserService, private store: Store<AppState>, private router: Router, public authService: AuthService) { }

  ngOnInit() {
  }

  doLogin() {
    this.userService.login(this.credentials).toPromise()
      .then(response => {
        this.authService.token = response.token
        sessionStorage.setItem('token', response.token)
        this.userService.getUser(this.credentials.email).toPromise()
          .then(user => {
            if (user) {
              sessionStorage.setItem('user', JSON.stringify(user))
              this.store.dispatch(fillUser({payload: user}))
              this.router.navigate(['home'])
            }
          })
      })
      .catch(error => { alert("Falha ao fazer login") })
  }
}
