import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { NbButtonModule, NbCardModule, NbDialogRef } from '@nebular/theme';
import { Store } from '@ngrx/store';

import { TransactionType } from '@app/graphql/generated/schema';
import { ButtonGroupComponent } from '@app/shared/forms/button-group/button-group.component';
import { DatepickerComponent } from '@app/shared/forms/datepicker/datepicker.component';
import { FormActionsComponent } from '@app/shared/forms/form-actions/form-actions.component';
import { FormControlComponent } from '@app/shared/forms/form-control/form-control.component';
import { FormGroupComponent } from '@app/shared/forms/form-group/form-group.component';
import { InputComponent } from '@app/shared/forms/input/input.component';
import { LabelComponent } from '@app/shared/forms/label/label.component';
import { ValidationMessageComponent } from '@app/shared/forms/validation-message/validation-message.component';
import { CategoryModule } from '@app/shared/modules/category/category.module';
import { SelectItem, updateValueAndValidity } from '@app/shared/utils/form.utils';
import { createTransactionActions } from '../../store/actions/create-transaction.actions';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NbCardModule,
    NbButtonModule,
    CategoryModule,
    ReactiveFormsModule,
    FormGroupComponent,
    FormControlComponent,
    FormActionsComponent,
    LabelComponent,
    InputComponent,
    ButtonGroupComponent,
    DatepickerComponent,
    ValidationMessageComponent,
  ],
})
export class CreateTransactionComponent {
  private store = inject(Store);
  private dialogRef = inject(NbDialogRef);

  public readonly typeOptions: SelectItem[] = [
    {
      label: 'Expense',
      value: TransactionType.Expense,
    },
    {
      label: 'Income',
      value: TransactionType.Income,
    },
  ];

  public readonly createTransactionForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    date: new FormControl(new Date(), {
      nonNullable: true,
      validators: [Validators.required],
    }),
    amount: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0.1)],
    }),
    type: new FormControl(TransactionType.Expense, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    categoryId: new FormControl<null | string>(null, {
      validators: [Validators.required],
    }),
    description: new FormControl<null | string>(null),
  });

  public closeModal(): void {
    this.dialogRef.close();
  }

  public submitModal(): void {
    if (this.createTransactionForm.valid) {
      const formValue = this.createTransactionForm.getRawValue();
      this.store.dispatch(
        createTransactionActions.start({
          request: {
            title: formValue.title,
            date: formValue.date.toUTCString(),
            amount: +formValue.amount,
            type: formValue.type,
            categoryId: formValue.categoryId as string,
            description: formValue.description,
          },
        }),
      );
      this.dialogRef.close();
    } else {
      updateValueAndValidity(this.createTransactionForm);
    }
  }
}
