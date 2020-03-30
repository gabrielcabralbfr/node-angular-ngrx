import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/_state';
import { Router } from '@angular/router';
import { clearState } from 'src/app/_state/actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public user: any;

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.store.select((state: any) => {
      this.user = state && state.newAppState ? state.newAppState.user :  JSON.parse(sessionStorage.getItem('user'))
    }).subscribe()
  }

  logout() {
    sessionStorage.clear()
    this.store.dispatch(clearState())
    this.router.navigate(['login'])

  }
 }