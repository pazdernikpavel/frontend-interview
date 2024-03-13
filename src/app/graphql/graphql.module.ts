import { isDevMode, NgModule } from '@angular/core';

import {
  ApolloLink,
  InMemoryCache,
  RequestHandler,
  ApolloClientOptions,
  DefaultOptions,
} from '@apollo/client/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

export function createApollo(httpLink: HttpLink): ApolloClientOptions<unknown> {
  const linksToUse: (ApolloLink | RequestHandler)[] = [];

  /* Apply HTTP link. Order does matter. HTTP link must be the last one. */
  linksToUse.push(httpLink.create({ uri: '/graphql' }));

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
    link: ApolloLink.from(linksToUse),
    cache: new InMemoryCache(),
    connectToDevTools: isDevMode(),
  };
}

@NgModule({
  imports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
