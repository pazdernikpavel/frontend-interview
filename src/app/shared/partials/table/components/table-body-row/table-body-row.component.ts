import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: '[app-table-body-row]',
  templateUrl: './table-body-row.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'app-table-body-row border-b bg-dark-2 border-gray-700' },
  standalone: true,
})
export class TableBodyRowComponent {}
