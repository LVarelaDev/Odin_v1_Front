import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
     
        let login: boolean = false;
        if (localStorage.getItem('login') === 'true') {
            login = true
        }
        if (request.url.endsWith('login') && !login) {
            this.router.navigate(['productos']);
            return next.handle(request);
        }

        return next.handle(request);
    }
}
