import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: '[app-table]',
  templateUrl: './table.component.html',
  host: { class: 'app-table w-full text-sm text-left text-gray-400' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class TableComponent<T> {
  public readonly appData = input<T[]>([]);
  public readonly appNoRecords = input<string>('No records found.');
}
