import { HttpClientModule } from '@angular/common/http';
import { isDevMode, NgModule } from '@angular/core';

import {
  ApolloLink,
  InMemoryCache,
  ApolloClientOptions,
  DefaultOptions,
} from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { Store } from '@ngrx/store';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { firstValueFrom } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { logoutActions } from '@app/auth/store/actions/logout.actions';
import { selectAuthState } from '@app/auth/store/auth.selectors';

export function createApollo(createHttpLink: HttpLink, store: Store): ApolloClientOptions<unknown> {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      for (const error of graphQLErrors) {
        if (error.extensions['code'] === 'UNAUTHENTICATED') {
          // TODO: Add refresh token handling here
          store.dispatch(logoutActions.notAuthenticated());
          return;
        }
      }
    }

    if (networkError) {
      // eslint-disable-next-line no-console
      console.error(`[Network error]: ${networkError}`);
    }
  });

  const authLink = setContext(async () => {
    const token = await firstValueFrom(
      store.select(selectAuthState).pipe(
        filter(state => state.attemptedToAuthenticate),
        map(state => state.user?.tokens?.access_token ?? null),
      ),
    );

    return {
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
    };
  });

  const httpLink = createHttpLink.create({ uri: '/graphql' });

  const defaultOptions: DefaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  };

  return {
    defaultOptions,
    link: ApolloLink.from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
    connectToDevTools: isDevMode(),
  };
}

@NgModule({
  imports: [ApolloModule, HttpClientModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, Store],
    },
  ],
})
export class GraphQLModule {}
