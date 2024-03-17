import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Signal, inject, viewChild } from '@angular/core';

import {
  NbButtonModule,
  NbIconModule,
  NbPopoverDirective,
  NbPopoverModule,
  NbSpinnerModule,
} from '@nebular/theme';
import { Store } from '@ngrx/store';

import { TransactionType } from '@app/graphql/generated/schema';
import { selectCategoryById } from '@app/shared/modules/category/store/category.selectors';
import { PopoverConfirmationComponent } from '@app/shared/partials/popover-confirmation/popover-confirmation.component';
import { TableModule } from '@app/shared/partials/table/table.module';
import { createTransactionActions } from '../../store/actions/create-transaction.actions';
import { deleteTransactionActions } from '../../store/actions/delete-transaction.actions';
import { getTransactionsActions } from '../../store/actions/get-transactions.actions';
import {
  selectIsFetchingTransactionList,
  selectTransactionList,
} from '../../store/transaction.selectors';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  host: { class: 'flex flex-col gap-3' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    NbSpinnerModule,
    NbIconModule,
    NbButtonModule,
    NbPopoverModule,
    TableModule,
    PopoverConfirmationComponent,
  ],
})
export class TransactionListComponent {
  private store = inject(Store);

  public readonly popover = viewChild.required(NbPopoverDirective);
  public readonly transactionType = TransactionType;
  public readonly transactions = this.store.selectSignal(selectTransactionList);
  public readonly isFetchingList = this.store.selectSignal(selectIsFetchingTransactionList);

  constructor() {
    this.store.dispatch(getTransactionsActions.start());
  }

  public getCategoryName(categoryId: string): Signal<string> {
    return this.store.selectSignal(selectCategoryById(categoryId));
  }

  public deleteTransaction(transactionId: string): void {
    this.popover().hide();
    this.store.dispatch(deleteTransactionActions.start({ request: { id: transactionId } }));
  }

  public handlePopoverCancel(): void {
    this.popover().hide();
  }

  public openCreateTransactionModal(): void {
    this.store.dispatch(createTransactionActions.openModal());
  }
}
