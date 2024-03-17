import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CategorySelectComponent } from './components/category-select/category-select.component';
import { categoryEffects } from './store/category.effects';
import { categoryReducerSlice } from './store/category.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(categoryReducerSlice),
    EffectsModule.forFeature(categoryEffects),
    CategorySelectComponent,
  ],
  exports: [CategorySelectComponent],
})
export class CategoryModule {}
