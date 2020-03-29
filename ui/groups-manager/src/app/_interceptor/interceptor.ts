import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../_services/auth/auth.service';

@Injectable({
    providedIn: 'root'
})

export class AddHeaderInterceptor implements HttpInterceptor {
    public token: string;

    constructor(private authService: AuthService) {
        this.token = this.authService.token || sessionStorage.getItem('token')
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var clonedRequest = req.clone({ headers: req.headers.set('Authorization', 'bearer ' + this.token) });
        return next.handle(clonedRequest);
    }
}
