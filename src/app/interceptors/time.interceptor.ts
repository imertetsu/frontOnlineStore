import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContext,
  HttpContextToken
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';

//aca inicializamos en falso
const CHECK_TIME = new HttpContextToken<boolean>(() => false);

export function checkTime(){
  //aca lo volvemos true para que se ejecute el interceptor
  return new HttpContext().set(CHECK_TIME, true);
}

@Injectable()
export class TimeInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //revisamos si el el contexto esta en true para ejecutar el interceptor
    if(request.context.get(CHECK_TIME)){
      //utilidad del navegador, para evaluar el tiempo inicial
      const start = performance.now();
      return next.handle(request)
      .pipe(
        //es un espacio para ejecutar cualquier cosa xv
        tap(() => {
          const time = (performance.now() - start)+' ms';
          console.log(request.url, time);
        })
      );
    }
    return next.handle(request);
  }
}
