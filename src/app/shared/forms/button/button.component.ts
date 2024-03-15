import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { NbButtonModule, NbSpinnerModule } from '@nebular/theme';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NbButtonModule, NbSpinnerModule],
  standalone: true,
})
export class ButtonComponent {
  public isLoading = input(false);
}
