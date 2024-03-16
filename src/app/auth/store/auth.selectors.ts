import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AUTH_FEATURENAME, AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>(AUTH_FEATURENAME);

export const selectIsAuthenticating = createSelector(
  selectAuthState,
  state => state.isAuthenticating,
);

export const selectFailedToAuthenticate = createSelector(
  selectAuthState,
  state => state.failedToAuthenticate,
);

export const selectIsAuthenticated = createSelector(selectAuthState, state => !!state.user);

export const selectUserEmail = createSelector(selectAuthState, state => state.user?.email ?? '');
