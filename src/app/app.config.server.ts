import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

const serverConfig: ApplicationConfig = {
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    provideServerRendering()
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
