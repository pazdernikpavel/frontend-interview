import { FeatureSlice, createReducer, on } from '@ngrx/store';
import { jwtDecode } from 'jwt-decode';

import { Maybe, TokensTypeFragment } from '@app/graphql/generated/schema';
import { loginActions } from './actions/login.actions';
import { logoutActions } from './actions/logout.actions';
import { persistanceActions } from './actions/persistance.actions';
import { signUpActions } from './actions/sign-up.actions';

export type JwtPayload = {
  sub: string;
  email: string;
  iat: number;
  exp: number;
};

export type User = {
  email: string;
  tokens: TokensTypeFragment | null;
};

export type AuthState = {
  isAuthenticating: boolean;
  attemptedToAuthenticate: boolean;
  failedToAuthenticate: boolean;
  user: Maybe<User>;
};

export const initialState: AuthState = {
  isAuthenticating: false,
  attemptedToAuthenticate: true,
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
    persistanceActions.tokensLoaded,
    (state, { tokens }): AuthState => {
      const { access_token } = tokens;
      const { email } = jwtDecode<JwtPayload>(access_token);
      return {
        ...state,
        isAuthenticating: false,
        attemptedToAuthenticate: true,
        user: {
          email,
          tokens,
        },
      };
    },
  ),

  on(
    signUpActions.error,
    loginActions.error,
    (state): AuthState => ({
      ...state,
      failedToAuthenticate: true,
      isAuthenticating: false,
      attemptedToAuthenticate: true,
    }),
  ),

  on(
    persistanceActions.failedToLoadTokens,
    (state): AuthState => ({
      ...state,
      attemptedToAuthenticate: true,
    }),
  ),

  on(
    logoutActions.logoutUser,
    (): AuthState => ({
      ...initialState,
      attemptedToAuthenticate: true,
    }),
  ),
);

export const authReducerSlice: FeatureSlice<AuthState> = {
  name: AUTH_FEATURENAME,
  reducer: authReducer,
};
