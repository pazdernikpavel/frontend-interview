import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-form-actions',
  templateUrl: './form-actions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'w-full flex gap-2 justify-end' },
  standalone: true,
})
export class FormActionsComponent {}
