import { CreateTransactionEffects } from './effects/create-transaction.effects';
import { DeleteTransactionEffects } from './effects/delete-transaction.effects';
import { GetTransactionsEffects } from './effects/get-transactions.effects';

export const transactionEffects = [
  GetTransactionsEffects,
  DeleteTransactionEffects,
  CreateTransactionEffects,
];
