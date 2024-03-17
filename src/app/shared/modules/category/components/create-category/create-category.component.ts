import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { NbButtonModule, NbCardModule, NbDialogRef } from '@nebular/theme';
import { Store } from '@ngrx/store';

import { FormActionsComponent } from '@app/shared/forms/form-actions/form-actions.component';
import { FormControlComponent } from '@app/shared/forms/form-control/form-control.component';
import { FormGroupComponent } from '@app/shared/forms/form-group/form-group.component';
import { InputComponent } from '@app/shared/forms/input/input.component';
import { LabelComponent } from '@app/shared/forms/label/label.component';
import { ValidationMessageComponent } from '@app/shared/forms/validation-message/validation-message.component';
import { updateValueAndValidity } from '@app/shared/utils/form.utils';
import { createCategoryActions } from '../../store/actions/create-category.actions';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NbCardModule,
    NbButtonModule,
    ReactiveFormsModule,
    FormGroupComponent,
    FormControlComponent,
    FormActionsComponent,
    LabelComponent,
    InputComponent,
    ValidationMessageComponent,
  ],
})
export class CreateCategoryComponent {
  private store = inject(Store);
  private dialogRef = inject(NbDialogRef);

  public readonly createCategoryForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  public closeModal(): void {
    this.dialogRef.close();
  }

  public submitModal(): void {
    if (this.createCategoryForm.valid) {
      this.store.dispatch(
        createCategoryActions.start({
          request: this.createCategoryForm.getRawValue(),
        }),
      );
      this.dialogRef.close();
    } else {
      updateValueAndValidity(this.createCategoryForm);
    }
  }
}
