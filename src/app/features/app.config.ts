import { ApplicationConfig, enableProdMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { environment } from '../../environments/environment';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

if (environment.production) {
  enableProdMode()
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(), provideAnimationsAsync()]
};


