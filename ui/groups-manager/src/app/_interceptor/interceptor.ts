import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../_services/auth/auth.service';
import { AppState } from '../_state';
import { State } from '@ngrx/store';

@Injectable({
    providedIn: 'root'
})

export class AddHeaderInterceptor implements HttpInterceptor {
    public token: string;

    constructor(private authService: AuthService, private state: State<AppState>) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.token = this.authService.token || sessionStorage.getItem('token')
        if (!this.token) {
            if (this.state.getValue() && this.state.getValue().newAppState && this.state.getValue().newAppState.token) {
                this.token = this.state.getValue().newAppState.token
            }
        }
        var clonedRequest = req.clone({ headers: req.headers.set('Authorization', 'bearer ' + this.token) });
        return next.handle(clonedRequest);
    }
}
