import { createActionGroup, emptyProps, props } from '@ngrx/store';

import {
  CreateTransactionRecordInput,
  TransactionRecordTypeFragment,
} from '@app/graphql/generated/schema';

export const createTransactionActions = createActionGroup({
  source: 'Create Transaction',
  events: {
    openModal: emptyProps(),
    start: props<{ request: CreateTransactionRecordInput }>(),
    success: props<{ response: TransactionRecordTypeFragment }>(),
    error: props<{ message: string }>(),
  },
});
