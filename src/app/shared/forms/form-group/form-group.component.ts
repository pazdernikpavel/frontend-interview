/* eslint-disable @angular-eslint/prefer-on-push-component-change-detection */

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
})
export class FormGroupComponent {
  @Output() public readonly appFormSubmit = new EventEmitter<void>();
  public form = input.required<FormGroup>();
}
