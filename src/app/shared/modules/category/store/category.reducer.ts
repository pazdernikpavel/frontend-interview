import { FeatureSlice, createReducer, on } from '@ngrx/store';

import { Category, Maybe } from '@app/graphql/generated/schema';
import { createCategoryActions } from './actions/create-category.actions';
import { deleteCategoryActions } from './actions/delete-category.actions';
import { getCategoriesActions } from './actions/get-categories.actions';

export type CategoryState = {
  isCreating: boolean;
  isDeleting: boolean;
  isFetchingList: boolean;
  categories: Category[];
  error: Maybe<string>;
};

export const initialState: CategoryState = {
  isCreating: false,
  isDeleting: false,
  isFetchingList: false,
  categories: [],
  error: null,
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
      error: message,
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
    deleteCategoryActions.start,
    (state): CategoryState => ({
      ...state,
      isDeleting: true,
    }),
  ),

  on(
    deleteCategoryActions.error,
    (state, { message }): CategoryState => ({
      ...state,
      isDeleting: false,
      error: message,
    }),
  ),

  on(deleteCategoryActions.success, (state, { response }): CategoryState => {
    let newCategories = [...state.categories];

    if (response) {
      newCategories = newCategories.filter(category => category.id !== response.id);
    }

    return {
      ...state,
      isDeleting: false,
      categories: newCategories,
    };
  }),

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
      error: message,
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
