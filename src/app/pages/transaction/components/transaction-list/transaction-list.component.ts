import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionListComponent {}
