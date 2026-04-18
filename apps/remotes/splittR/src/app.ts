import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ApplicationRef } from '@angular/core';

let appRef: ApplicationRef | null = null;

export const mount = async (el: HTMLElement) => {
  el.innerHTML = '<app-root></app-root>';
  try {
    appRef = await bootstrapApplication(AppComponent, appConfig);
  } catch (err) {
    console.error('Error bootstrapping Angular app:', err);
  }
};

export const unmount = (el: HTMLElement) => {
  if (appRef) {
    appRef.destroy();
    appRef = null;
  }
  el.innerHTML = '';
};
