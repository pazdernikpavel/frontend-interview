import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: '[app-table-container]',
  templateUrl: './table-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'app-table-container relative overflow-x-auto shadow-md rounded' },
  standalone: true,
})
export class TableContainerComponent {}
