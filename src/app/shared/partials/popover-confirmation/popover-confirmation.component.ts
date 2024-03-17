import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

import { NbButtonModule } from '@nebular/theme';

@Component({
  selector: 'app-popover-confirmation',
  templateUrl: './popover-confirmation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NbButtonModule],
  standalone: true,
})
export class PopoverConfirmationComponent {
  @Output() public appConfirm = new EventEmitter<void>();
  @Output() public appCancel = new EventEmitter<void>();
}
