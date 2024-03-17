import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CategoryModule } from '@app/shared/modules/category/category.module';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { transactionRoutes } from './transaction.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(transactionRoutes), CategoryModule],
  declarations: [TransactionListComponent],
})
export class TransactionModule {}
