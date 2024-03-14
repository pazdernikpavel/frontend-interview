import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NbLayoutModule } from '@nebular/theme';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NbLayoutModule],
})
export class LayoutComponent {}

