import { Routes } from '@angular/router';

import { TransactionListComponent } from './components/transaction-list/transaction-list.component';

export const transactionRoutes: Routes = [
  {
    path: '',
    component: TransactionListComponent,
  },
];
