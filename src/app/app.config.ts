import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_RIPPLE_GLOBAL_OPTIONS, RippleGlobalOptions } from '@angular/material/core';

const globalRippleConfig: RippleGlobalOptions = {
  disabled: true,
  animation: {
    enterDuration: 300,
    exitDuration: 0
  }
};

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), provideRouter(routes), provideAnimationsAsync(), { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig }]
};
