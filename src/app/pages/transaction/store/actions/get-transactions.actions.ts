import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { TransactionRecordTypeFragment } from '@app/graphql/generated/schema';

export const getTransactionsActions = createActionGroup({
  source: 'Get Transactions',
  events: {
    start: emptyProps(),
    success: props<{ response: Array<TransactionRecordTypeFragment> }>(),
    error: props<{ message: string }>(),
  },
});
