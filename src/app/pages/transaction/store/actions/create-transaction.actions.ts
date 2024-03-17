import { createActionGroup, props } from '@ngrx/store';

import {
  CreateTransactionRecordInput,
  TransactionRecordTypeFragment,
} from '@app/graphql/generated/schema';

export const createTransactionActions = createActionGroup({
  source: 'Create Transaction',
  events: {
    start: props<{ request: CreateTransactionRecordInput }>(),
    success: props<{ response: TransactionRecordTypeFragment }>(),
    error: props<{ message: string }>(),
  },
});
