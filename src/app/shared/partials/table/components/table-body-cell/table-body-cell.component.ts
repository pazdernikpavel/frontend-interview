import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';

import { CommonTableInputs } from '../../table.shared';

@Component({
  selector: '[app-table-body-cell]',
  templateUrl: './table-body-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'app-table-body-cell px-6 py-4' },
  standalone: true,
})
export class TableBodyCellComponent extends CommonTableInputs {
  public readonly highlight = input(false);

  @HostBinding('class.font-medium')
  @HostBinding('class.whitespace-nowrap')
  @HostBinding('class.text-white')
  public get shouldBeHiglighted(): boolean {
    return this.highlight();
  }
}
