import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: '[app-table-head]',
  templateUrl: './table-head.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'app-table-head text-xs uppercase bg-dark-1 text-gray-400' },
  standalone: true,
})
export class TableHeadComponent {}
