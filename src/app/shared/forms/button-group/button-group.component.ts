import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { NbButtonGroupModule, NbButtonModule } from '@nebular/theme';

import { SelectItem } from '@app/shared/utils/form.utils';
import { FormControlInput } from '../forms.shared';

@Component({
  selector: 'app-button-group',
  templateUrl: './button-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, NbButtonModule, NbButtonGroupModule],
})
export class ButtonGroupComponent extends FormControlInput {
  public readonly appItems = input.required<SelectItem[]>();

  // Nebular on change event return any[] type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public updateControlValue(value: any[]): void {
    this.appControl().setValue(value[0]);
  }
}
