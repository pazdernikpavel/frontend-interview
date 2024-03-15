import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

export type ControlStatus = 'basic' | 'primary' | 'info' | 'success' | 'warning' | 'danger';

/**
 * Replacement to default .markAllAsTouched() method as it does not work well with nested forms.
 */
export function updateValueAndValidity(control: AbstractControl): void {
  if (control.invalid) {
    control.markAsTouched();
    control.markAsDirty();
    control.updateValueAndValidity({ onlySelf: true });

    if (control instanceof FormGroup) {
      Object.values(control.controls).forEach(control => updateValueAndValidity(control));
    } else if (control instanceof FormArray) {
      control.controls.forEach(control => updateValueAndValidity(control));
    }
  }
}

/**
 * Returns the status of the control based on its validity and touched status.
 * Usable for Nebular form controls.
 */
export function getValidatedStatus(
  control: AbstractControl,
  handler: () => ControlStatus = () => 'basic',
): ControlStatus {
  return control.touched && control.invalid ? 'danger' : handler();
}
