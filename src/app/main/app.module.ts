import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbGlobalPhysicalPosition,
  NbLayoutModule,
  NbThemeModule,
  NbThemeOptions,
  NbToastrConfig,
  NbToastrModule,
} from '@nebular/theme';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule, StoreDevtoolsOptions } from '@ngrx/store-devtools';

import { AuthModule } from '@app/auth/auth.module';
import { GraphQLModule } from '@app/graphql/graphql.module';
import { appEffects } from '@app/store/app.effects';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';

/** NgRx store browser dev tools config. */
const storeDevtoolsOptions: StoreDevtoolsOptions = {
  maxAge: 25,
  traceLimit: 75,
  logOnly: !isDevMode(),
  connectInZone: true,
};

/** Nebular notification config. */
const nbToastrOptions: Partial<NbToastrConfig> = {
  duration: 5_000,
  position: NbGlobalPhysicalPosition.TOP_RIGHT,
};

/** Nebular theming setup. */
const nbThemeOptions: NbThemeOptions = {
  name: 'dark',
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    StoreModule.forRoot(),
    EffectsModule.forRoot(appEffects),
    StoreDevtoolsModule.instrument(storeDevtoolsOptions),
    StoreRouterConnectingModule.forRoot(),
    NbThemeModule.forRoot(nbThemeOptions),
    NbToastrModule.forRoot(nbToastrOptions),
    NbEvaIconsModule,
    NbLayoutModule,
    GraphQLModule,
    AuthModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
