import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbLayoutModule, NbThemeModule, NbToastrModule } from '@nebular/theme';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule, StoreDevtoolsOptions } from '@ngrx/store-devtools';

import { AuthModule } from '@app/auth/auth.module';
import { GraphQLModule } from '@app/graphql/graphql.module';
import { appEffects } from '@app/store/app.effects';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';

const storeDevtoolsOptions: StoreDevtoolsOptions = {
  maxAge: 25,
  traceLimit: 75,
  logOnly: !isDevMode(),
  connectInZone: true,
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    StoreModule.forRoot({}),
    EffectsModule.forRoot(appEffects),
    StoreDevtoolsModule.instrument(storeDevtoolsOptions),
    StoreRouterConnectingModule.forRoot(),
    NbThemeModule.forRoot({ name: 'dark' }),
    NbToastrModule.forRoot(),
    NbEvaIconsModule,
    NbLayoutModule,
    GraphQLModule,
    AuthModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
