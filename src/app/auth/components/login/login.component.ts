import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NbButtonModule, NbSpinnerModule } from '@nebular/theme';
import { Store } from '@ngrx/store';

import { AuthRoute } from '@app/auth/routing/auth.route.enum';
import { loginActions } from '@app/auth/store/actions/login.actions';
import { selectIsAuthenticating } from '@app/auth/store/auth.selectors';
import { AppRoute } from '@app/main/app.route.enum';
import { FormControlComponent } from '@app/shared/forms/form-control/form-control.component';
import { FormGroupComponent } from '@app/shared/forms/form-group/form-group.component';
import { InputComponent } from '@app/shared/forms/input/input.component';
import { LabelComponent } from '@app/shared/forms/label/label.component';
import { ValidationMessageComponent } from '@app/shared/forms/validation-message/validation-message.component';
import { updateValueAndValidity } from '@app/shared/utils/form.utils';
import { AuthScreenComponent } from '../auth-screen/auth-screen.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AuthScreenComponent,
    NbSpinnerModule,
    NbButtonModule,
    ReactiveFormsModule,
    RouterModule,
    FormGroupComponent,
    FormControlComponent,
    LabelComponent,
    InputComponent,
    ValidationMessageComponent,
  ],
})
export class LoginComponent {
  private readonly store = inject(Store);

  public readonly appRoute = AppRoute;
  public readonly authRoute = AuthRoute;
  public readonly isAuthenticating = this.store.selectSignal(selectIsAuthenticating);
  public readonly loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  public submit(): void {
    if (this.loginForm.valid) {
      this.store.dispatch(
        loginActions.start({
          request: this.loginForm.getRawValue(),
        }),
      );
    } else {
      updateValueAndValidity(this.loginForm);
    }
  }
}
