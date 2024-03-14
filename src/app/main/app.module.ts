import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { NbThemeModule } from '@nebular/theme';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AuthModule } from '@app/auth/auth.module';
import { GraphQLModule } from '@app/graphql/graphql.module';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      traceLimit: 75,
      logOnly: !isDevMode(),

      connectInZone: true,
    }),
    StoreRouterConnectingModule.forRoot(),
    NbThemeModule.forRoot(),
    GraphQLModule,
    AuthModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
