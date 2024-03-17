import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: '[app-table-header-row]',
  templateUrl: './table-header-row.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'app-table-header-row' },
  standalone: true,
})
export class TableHeaderRowComponent {}
