import { createActionGroup, props } from '@ngrx/store';

import {
  DeleteTransactionMutationVariables,
  Maybe,
  TransactionRecordTypeFragment,
} from '@app/graphql/generated/schema';

export const deleteTransactionActions = createActionGroup({
  source: 'Delete Transaction',
  events: {
    start: props<{ request: DeleteTransactionMutationVariables }>(),
    success: props<{ response?: Maybe<TransactionRecordTypeFragment> }>(),
    error: props<{ message: string }>(),
  },
});
