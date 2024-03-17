import { FeatureSlice, createReducer, on } from '@ngrx/store';

import { Category, Maybe } from '@app/graphql/generated/schema';
import { createCategoryActions } from './actions/create-category.actions';
import { getCategoriesActions } from './actions/get-categories.actions';

export type CategoryState = {
  isCreating: boolean;
  isFetchingList: boolean;
  categories: Category[];
  expectedError: Maybe<string>;
  unexpectedError: Maybe<string>;
};

export const initialState: CategoryState = {
  isCreating: false,
  isFetchingList: false,
  categories: [],
  expectedError: null,
  unexpectedError: null,
};

export const CATEGORY_FEATURENAME = 'category';

export const categoryReducer = createReducer(
  initialState,

  on(
    createCategoryActions.start,
    (state): CategoryState => ({
      ...state,
      isCreating: true,
    }),
  ),

  on(
    createCategoryActions.error,
    (state, { message }): CategoryState => ({
      ...state,
      isCreating: false,
      expectedError: message,
    }),
  ),

  on(
    createCategoryActions.success,
    (state, { response }): CategoryState => ({
      ...state,
      isCreating: false,
      categories: state.categories.concat(response),
    }),
  ),

  on(
    getCategoriesActions.start,
    (state): CategoryState => ({
      ...state,
      isFetchingList: true,
    }),
  ),

  on(
    getCategoriesActions.error,
    (state, { message }): CategoryState => ({
      ...state,
      isFetchingList: false,
      unexpectedError: message,
    }),
  ),

  on(
    getCategoriesActions.success,
    (state, { response }): CategoryState => ({
      ...state,
      isFetchingList: false,
      categories: response,
    }),
  ),
);

export const categoryReducerSlice: FeatureSlice<CategoryState> = {
  name: CATEGORY_FEATURENAME,
  reducer: categoryReducer,
};
