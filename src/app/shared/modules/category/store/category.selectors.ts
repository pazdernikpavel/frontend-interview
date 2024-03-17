import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CATEGORY_FEATURENAME, CategoryState } from './category.reducer';

export const selectCategoryState = createFeatureSelector<CategoryState>(CATEGORY_FEATURENAME);

export const selectCategoryList = createSelector(selectCategoryState, state => state.categories);

export const selectIsFetchingCategoryList = createSelector(
  selectCategoryState,
  state => state.isFetchingList,
);

export const selectCategoryById = (categoryId: string) =>
  createSelector(
    selectCategoryList,
    categories => categories.find(category => category.id === categoryId)?.title || categoryId,
  );
