import { FeatureSlice, createReducer, on } from '@ngrx/store';

import { Maybe, TokensTypeFragment } from '@app/graphql/generated/schema';
import { loginActions } from './actions/login.actions';
import { signUpActions } from './actions/sign-up.actions';

export type User = {
  email: string;
  tokens: TokensTypeFragment | null;
};

export type AuthState = {
  isAuthenticating: boolean;
  failedToAuthenticate: boolean;
  user: Maybe<User>;
};

export const initialState: AuthState = {
  isAuthenticating: false,
  failedToAuthenticate: false,
  user: null,
};

export const AUTH_FEATURENAME = 'auth';

export const authReducer = createReducer(
  initialState,

  on(
    signUpActions.start,
    loginActions.start,
    (state): AuthState => ({
      ...state,
      isAuthenticating: true,
    }),
  ),

  on(
    signUpActions.success,
    loginActions.success,
    (state): AuthState => ({
      ...state,
      isAuthenticating: false,
    }),
  ),

  on(
    signUpActions.error,
    loginActions.error,
    (state): AuthState => ({
      ...state,
      failedToAuthenticate: true,
      isAuthenticating: false,
    }),
  ),
);

export const authReducerSlice: FeatureSlice<AuthState> = {
  name: AUTH_FEATURENAME,
  reducer: authReducer,
};
