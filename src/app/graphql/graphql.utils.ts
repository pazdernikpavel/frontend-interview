/* eslint-disable @typescript-eslint/no-explicit-any */

import { ApolloQueryResult } from '@apollo/client/core';
import { TypedAction } from '@ngrx/store/src/models';
import { Mutation, MutationResult, Query } from 'apollo-angular';
import { EmptyObject } from 'apollo-angular/types';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export type QueryType<T extends Query<any, any>> =
  ReturnType<T['fetch']> extends Observable<ApolloQueryResult<infer R>> ? R : never;
export type QueryVariablesType<T> = T extends Query<any, infer V> ? V : EmptyObject;
export type MutationType<T extends Mutation<any, any>> =
  ReturnType<T['mutate']> extends Observable<MutationResult<infer R>> ? R : never;
export type MutationVariablesType<T> = T extends Mutation<any, infer V> ? V : EmptyObject;

/**
 * Fetches query, maps result with success action or error with error action
 */
export function fetchQuery<
  GQL extends Query<any, any>,
  S extends TypedAction<any>,
  E extends TypedAction<any>,
>(
  gql: GQL,
  variables: QueryVariablesType<GQL>,
  successAction: (data: QueryType<GQL>) => S,
  errorAction: (error: string) => E,
): Observable<S | E> {
  return gql.fetch(variables, { fetchPolicy: 'network-only' }).pipe(
    map((response: ApolloQueryResult<GQL>) => {
      if (response.data) {
        return successAction(response.data as QueryType<GQL>);
      } else {
        const errorMessage =
          response.errors && response.errors.length
            ? response.errors.map(error => error.message).join('. ')
            : response.error
              ? response.error.message
              : 'Unknown error';

        return errorAction(errorMessage);
      }
    }),
    catchError(error => of(errorAction(error.message ? error.message : error))),
  );
}

/**
 * Executes mutations, maps result with success action or error with error action
 */
export function executeMutation<
  GQL extends Mutation<any, any>,
  S extends TypedAction<any>,
  E extends TypedAction<any>,
>(
  gql: GQL,
  variables: MutationVariablesType<GQL>,
  successAction: (data: MutationType<GQL>) => S,
  errorAction: (error: string) => E,
): Observable<S | E> {
  return gql.mutate(variables).pipe(
    map((response: MutationResult<GQL>) => {
      if (response.data) {
        return successAction(response.data as MutationType<GQL>);
      } else {
        const errorMessage =
          response.errors && response.errors.length
            ? response.errors.map(error => error.message).join('. ')
            : 'Unknown error';
        return errorAction(errorMessage);
      }
    }),
    catchError(error => of(errorAction(error.message ? error.message : error))),
  );
}
