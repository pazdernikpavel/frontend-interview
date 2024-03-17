import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: '[app-table]',
  templateUrl: './table.component.html',
  host: { class: 'app-table w-full text-sm text-left text-gray-400' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class TableComponent {}
