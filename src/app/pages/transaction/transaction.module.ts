import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CategoryModule } from '@app/shared/modules/category/category.module';
import { CreateTransactionComponent } from './components/create-transaction/create-transaction.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { transactionEffects } from './store/transaction.effects';
import { transactionReducerSlice } from './store/transaction.reducer';
import { transactionRoutes } from './transaction.routes';

@NgModule({
  imports: [
    RouterModule.forChild(transactionRoutes),
    StoreModule.forFeature(transactionReducerSlice),
    EffectsModule.forFeature(transactionEffects),
    CategoryModule,
    TransactionListComponent,
    CreateTransactionComponent,
  ],
})
export class TransactionModule {}
