import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { NbDatepickerModule, NbInputModule } from '@nebular/theme';

import { FormControlInput } from '../forms.shared';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, NbDatepickerModule, NbInputModule],
})
export class DatepickerComponent extends FormControlInput {}
