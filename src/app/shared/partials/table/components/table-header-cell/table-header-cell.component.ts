import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CommonTableInputs } from '../../table.shared';

@Component({
  selector: '[app-table-header-cell]',
  templateUrl: './table-header-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'app-table-header-cell px-6 py-3' },
  standalone: true,
})
export class TableHeaderCellComponent extends CommonTableInputs {}
