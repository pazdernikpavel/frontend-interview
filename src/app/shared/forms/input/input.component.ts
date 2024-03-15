/* eslint-disable @angular-eslint/prefer-on-push-component-change-detection */

import { CommonModule } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { NbFormFieldModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { map, switchMap } from 'rxjs';

import { getValidatedStatus } from '@app/shared/utils/form.utils';

type SupportedInputType = 'password' | 'text';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  imports: [CommonModule, ReactiveFormsModule, NbInputModule, NbFormFieldModule, NbIconModule],
  standalone: true,
})
export class InputComponent {
  public readonly control = input.required<FormControl>();
  public readonly isSecret = input(false);
  public readonly showSecret = signal(false);
  public readonly type = input<SupportedInputType>('text');

  public readonly computedType = computed(() =>
    this.isSecret() && !this.showSecret() ? 'password' : this.type(),
  );

  public controlStatus = toSignal(
    toObservable(this.control).pipe(
      switchMap(control => control.valueChanges.pipe(map(() => getValidatedStatus(control)))),
    ),
    { initialValue: 'basic' },
  );

  public toggleSecret(): void {
    this.showSecret.update(currentValue => !currentValue);
  }
}
