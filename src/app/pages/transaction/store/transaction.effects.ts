import { CreateTransactionEffects } from './effects/create-category.effects';
import { DeleteTransactionEffects } from './effects/delete-category.effects';
import { GetTransactionsEffects } from './effects/get-categories.effects';

export const transactionEffects = [
  GetTransactionsEffects,
  DeleteTransactionEffects,
  CreateTransactionEffects,
];
