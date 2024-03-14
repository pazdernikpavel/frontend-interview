import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { authEffects } from './store/auth.effects';
import { authReducerSlice } from './store/auth.reducer';

@NgModule({
  imports: [StoreModule.forFeature(authReducerSlice), EffectsModule.forFeature(authEffects)],
})
export class AuthModule {}
