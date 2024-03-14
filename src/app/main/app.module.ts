import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { NbLayoutModule, NbThemeModule } from '@nebular/theme';

import { GraphQLModule } from '@app/graphql/graphql.module';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    GraphQLModule,
    NbThemeModule.forRoot(),
    NbLayoutModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
