import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/features/main-page/app.config';
import { AppComponent } from './app/features/main-page/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
