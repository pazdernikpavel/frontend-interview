import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Signal, inject, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import {
  NbButtonModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbPopoverDirective,
  NbPopoverModule,
  NbSpinnerModule,
} from '@nebular/theme';
import { Store } from '@ngrx/store';
import { combineLatest, debounceTime, map, startWith } from 'rxjs';

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
    ReactiveFormsModule,
    NbSpinnerModule,
    NbIconModule,
    NbButtonModule,
    NbInputModule,
    NbFormFieldModule,
    NbIconModule,
    NbPopoverModule,
    TableModule,
    PopoverConfirmationComponent,
  ],
})
export class TransactionListComponent {
  private store = inject(Store);

  public readonly searchControl = new FormControl('');
  public readonly popover = viewChild.required(NbPopoverDirective);
  public readonly transactionType = TransactionType;
  public readonly isFetchingList = this.store.selectSignal(selectIsFetchingTransactionList);

  public readonly transactions = toSignal(
    combineLatest({
      transactions: this.store.select(selectTransactionList),
      search: this.searchControl.valueChanges.pipe(debounceTime(150), startWith('')),
    }).pipe(
      map(({ transactions, search }) =>
        search
          ? transactions.filter(
              transaction =>
                transaction.title.toLowerCase().includes(search.toLowerCase()) ||
                (transaction.description &&
                  transaction.description.toLowerCase().includes(search.toLowerCase())),
            )
          : transactions,
      ),
    ),
    { initialValue: [] },
  );

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
