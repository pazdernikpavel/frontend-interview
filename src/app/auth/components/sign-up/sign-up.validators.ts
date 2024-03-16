import { AbstractControl, ValidationErrors } from '@angular/forms';

export function confirmPasswordValidator(formGroup: AbstractControl): ValidationErrors | null {
  const password = formGroup.get('password');
  const passwordConfirm = formGroup.get('passwordConfirm');

  if (password?.value !== passwordConfirm?.value) {
    return { confirmPassword: true };
  }

  return null;
}
