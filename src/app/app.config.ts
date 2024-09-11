import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { headersInterceptor } from './core/interceptors/headers.interceptor';
import { errorsInterceptor } from './core/interceptors/errors.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch() , withInterceptors([headersInterceptor , errorsInterceptor ,loadingInterceptor])),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideToastr(),
    importProvidersFrom(NgxSpinnerModule),
  ],
};
