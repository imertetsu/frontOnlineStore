import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoadingPageInterceptor implements HttpInterceptor {

  private pendingRequests = 0;
  //constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.pendingRequests++;
    if (this.pendingRequests === 1) {
      const loadingImage = document.createElement('img');
      loadingImage.src = '/assets/images/loading.gif';
      loadingImage.style.position = 'fixed';
      loadingImage.style.top = '50%';
      loadingImage.style.left = '50%';
      loadingImage.style.transform = 'translate(-50%, -50%)';
      loadingImage.style.zIndex = '9999';
      document.body.appendChild(loadingImage);
    }
    return next.handle(request)
      .pipe(
        finalize(()=> {
          this.pendingRequests--;
          if (this.pendingRequests === 0) {
            // Ocultar la imagen de carga
            const loadingImage = document.querySelector('img[src="/assets/images/loading.gif"]');
            if (loadingImage) {
              loadingImage.remove();
            }
          }
        })
      );
  }
}
