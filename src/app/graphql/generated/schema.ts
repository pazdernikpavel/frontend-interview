import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Category = {
  __typename?: 'Category';
  authorId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type CreateCategoryInput = {
  title: Scalars['String']['input'];
};

export type CreateTransactionRecordInput = {
  amount: Scalars['Int']['input'];
  categoryId: Scalars['String']['input'];
  date: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  type: TransactionType;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory: Category;
  createTransactionRecord: TransactionRecord;
  login: Tokens;
  logout: Scalars['Boolean']['output'];
  refresh: Tokens;
  removeCategory?: Maybe<Category>;
  removeTransactionRecord?: Maybe<TransactionRecord>;
  signup: Tokens;
};

export type MutationCreateCategoryArgs = {
  createCategoryInput: CreateCategoryInput;
};

export type MutationCreateTransactionRecordArgs = {
  createTransactionRecordInput: CreateTransactionRecordInput;
};

export type MutationLoginArgs = {
  userInput: UserInput;
};

export type MutationRemoveCategoryArgs = {
  id: Scalars['String']['input'];
};

export type MutationRemoveTransactionRecordArgs = {
  id: Scalars['String']['input'];
};

export type MutationSignupArgs = {
  userInput: UserInput;
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Maybe<Category>>;
  transactionRecords: Array<Maybe<TransactionRecord>>;
};

export type Tokens = {
  __typename?: 'Tokens';
  access_token: Scalars['String']['output'];
  refresh_token: Scalars['String']['output'];
};

export type TransactionRecord = {
  __typename?: 'TransactionRecord';
  amount: Scalars['Int']['output'];
  authorId: Scalars['String']['output'];
  categoryId: Scalars['String']['output'];
  date: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type?: Maybe<TransactionType>;
};

export enum TransactionType {
  Expense = 'EXPENSE',
  Income = 'INCOME',
}

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  hashedRt?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  password: Scalars['String']['output'];
};

export type UserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type TokensTypeFragment = {
  __typename?: 'Tokens';
  access_token: string;
  refresh_token: string;
};

export type LoginMutationVariables = Exact<{
  input: UserInput;
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: { __typename?: 'Tokens'; access_token: string; refresh_token: string };
};

export type SignUpMutationVariables = Exact<{
  input: UserInput;
}>;

export type SignUpMutation = {
  __typename?: 'Mutation';
  signup: {
    __typename?: 'Tokens';
    access_token: string;
    refresh_token: string;
  };
};

export type CreateCategoryMutationVariables = Exact<{
  input: CreateCategoryInput;
}>;

export type CreateCategoryMutation = {
  __typename?: 'Mutation';
  createCategory: {
    __typename?: 'Category';
    id: string;
    title: string;
    authorId: string;
  };
};

export type DeleteCategoryMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type DeleteCategoryMutation = {
  __typename?: 'Mutation';
  removeCategory?: {
    __typename?: 'Category';
    id: string;
    title: string;
    authorId: string;
  } | null;
};

export type CategoryTypeFragment = {
  __typename?: 'Category';
  id: string;
  title: string;
  authorId: string;
};

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type GetCategoriesQuery = {
  __typename?: 'Query';
  categories: Array<{
    __typename?: 'Category';
    id: string;
    title: string;
    authorId: string;
  } | null>;
};

export type CreateTransactionMutationVariables = Exact<{
  input: CreateTransactionRecordInput;
}>;

export type CreateTransactionMutation = {
  __typename?: 'Mutation';
  createTransactionRecord: {
    __typename?: 'TransactionRecord';
    id: string;
    amount: number;
    authorId: string;
    categoryId: string;
    date: string;
    description?: string | null;
    title: string;
    type?: TransactionType | null;
  };
};

export type DeleteTransactionMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type DeleteTransactionMutation = {
  __typename?: 'Mutation';
  removeTransactionRecord?: {
    __typename?: 'TransactionRecord';
    id: string;
    amount: number;
    authorId: string;
    categoryId: string;
    date: string;
    description?: string | null;
    title: string;
    type?: TransactionType | null;
  } | null;
};

export type TransactionRecordTypeFragment = {
  __typename?: 'TransactionRecord';
  id: string;
  amount: number;
  authorId: string;
  categoryId: string;
  date: string;
  description?: string | null;
  title: string;
  type?: TransactionType | null;
};

export type GetTransactionsQueryVariables = Exact<{ [key: string]: never }>;

export type GetTransactionsQuery = {
  __typename?: 'Query';
  transactionRecords: Array<{
    __typename?: 'TransactionRecord';
    id: string;
    amount: number;
    authorId: string;
    categoryId: string;
    date: string;
    description?: string | null;
    title: string;
    type?: TransactionType | null;
  } | null>;
};

export const TokensTypeFragmentDoc = gql`
  fragment TokensType on Tokens {
    access_token
    refresh_token
  }
`;
export const CategoryTypeFragmentDoc = gql`
  fragment CategoryType on Category {
    id
    title
    authorId
  }
`;
export const TransactionRecordTypeFragmentDoc = gql`
  fragment TransactionRecordType on TransactionRecord {
    id
    amount
    authorId
    categoryId
    date
    description
    title
    type
  }
`;
export const LoginDocument = gql`
  mutation Login($input: UserInput!) {
    login(userInput: $input) {
      ...TokensType
    }
  }
  ${TokensTypeFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class LoginGQL extends Apollo.Mutation<LoginMutation, LoginMutationVariables> {
  override document = LoginDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const SignUpDocument = gql`
  mutation SignUp($input: UserInput!) {
    signup(userInput: $input) {
      ...TokensType
    }
  }
  ${TokensTypeFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class SignUpGQL extends Apollo.Mutation<SignUpMutation, SignUpMutationVariables> {
  override document = SignUpDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const CreateCategoryDocument = gql`
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(createCategoryInput: $input) {
      ...CategoryType
    }
  }
  ${CategoryTypeFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class CreateCategoryGQL extends Apollo.Mutation<
  CreateCategoryMutation,
  CreateCategoryMutationVariables
> {
  override document = CreateCategoryDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const DeleteCategoryDocument = gql`
  mutation DeleteCategory($id: String!) {
    removeCategory(id: $id) {
      ...CategoryType
    }
  }
  ${CategoryTypeFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class DeleteCategoryGQL extends Apollo.Mutation<
  DeleteCategoryMutation,
  DeleteCategoryMutationVariables
> {
  override document = DeleteCategoryDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const GetCategoriesDocument = gql`
  query GetCategories {
    categories {
      ...CategoryType
    }
  }
  ${CategoryTypeFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class GetCategoriesGQL extends Apollo.Query<
  GetCategoriesQuery,
  GetCategoriesQueryVariables
> {
  override document = GetCategoriesDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const CreateTransactionDocument = gql`
  mutation CreateTransaction($input: CreateTransactionRecordInput!) {
    createTransactionRecord(createTransactionRecordInput: $input) {
      ...TransactionRecordType
    }
  }
  ${TransactionRecordTypeFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class CreateTransactionGQL extends Apollo.Mutation<
  CreateTransactionMutation,
  CreateTransactionMutationVariables
> {
  override document = CreateTransactionDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const DeleteTransactionDocument = gql`
  mutation DeleteTransaction($id: String!) {
    removeTransactionRecord(id: $id) {
      ...TransactionRecordType
    }
  }
  ${TransactionRecordTypeFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class DeleteTransactionGQL extends Apollo.Mutation<
  DeleteTransactionMutation,
  DeleteTransactionMutationVariables
> {
  override document = DeleteTransactionDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const GetTransactionsDocument = gql`
  query GetTransactions {
    transactionRecords {
      ...TransactionRecordType
    }
  }
  ${TransactionRecordTypeFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class GetTransactionsGQL extends Apollo.Query<
  GetTransactionsQuery,
  GetTransactionsQueryVariables
> {
  override document = GetTransactionsDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
