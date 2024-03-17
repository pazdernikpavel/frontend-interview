/* eslint-disable @angular-eslint/prefer-on-push-component-change-detection */

import { CommonModule } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { NbFormFieldModule, NbIconModule, NbInputModule } from '@nebular/theme';

import { FormControlInput } from '../forms.shared';

type SupportedInputType = 'password' | 'text' | 'number';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  imports: [CommonModule, ReactiveFormsModule, NbInputModule, NbFormFieldModule, NbIconModule],
  standalone: true,
})
export class InputComponent extends FormControlInput {
  public readonly appName = input<string>();
  public readonly appIsSecret = input(false);
  public readonly appShowSecret = signal(false);
  public readonly appType = input<SupportedInputType>('text');

  public readonly computedType = computed(() =>
    this.appIsSecret() && !this.appShowSecret() ? 'password' : this.appType(),
  );

  public toggleSecret(): void {
    this.appShowSecret.update(currentValue => !currentValue);
  }
}
