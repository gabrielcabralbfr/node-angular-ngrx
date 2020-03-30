import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public environment = environment

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post(`${environment.api}/auth/login`, credentials)
  }

  getGroups(): Observable<any> {
    return this.http.get(`${this.environment.api}/groups`)
  }

  getUser(email): Observable<any> {
    return this.http.get(`${this.environment.api}/users/${email}`)
  }

  createUser(user): Observable<any> {
    return this.http.post(`${this.environment.api}/users/signup`, user)

  }

}
