import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: '[app-table-body]',
  templateUrl: './table-body.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'app-table-body' },
  standalone: true,
})
export class TableBodyComponent {}
