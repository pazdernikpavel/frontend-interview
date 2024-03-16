import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NbCardModule } from '@nebular/theme';

import { MeteorComponent } from '@app/shared/partials/meteor/meteor.component';

@Component({
  selector: 'app-auth-screen',
  templateUrl: './auth-screen.component.html',
  styleUrls: ['./auth-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NbCardModule, MeteorComponent],
})
export class AuthScreenComponent {}

