import { TestBed } from '@angular/core/testing';

import { LoadingPageInterceptor } from './loading-page.interceptor';

describe('LoadingPageInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      LoadingPageInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: LoadingPageInterceptor = TestBed.inject(LoadingPageInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
