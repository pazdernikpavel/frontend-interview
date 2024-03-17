import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { ControlStatus, getValidatedStatus, updateValueAndValidity } from './form.utils';

describe('FormUtils', () => {
  describe('updateValueAndValidity', () => {
    it('should call update each invalid form control in the abstract control structure', () => {
      const formGroup = new FormGroup({
        controlA: new FormControl('', [Validators.required]),
        constrolB: new FormGroup({
          controlC: new FormControl('', [Validators.required]),
        }),
        controlD: new FormArray([new FormControl('', [Validators.required]), new FormControl('')]),
      });

      updateValueAndValidity(formGroup);

      expect(formGroup.controls.controlA.dirty).toBeTruthy();
      expect(formGroup.controls.controlA.touched).toBeTruthy();
      expect(formGroup.controls.constrolB.controls.controlC.dirty).toBeTruthy();
      expect(formGroup.controls.constrolB.controls.controlC.touched).toBeTruthy();
      expect(formGroup.controls.controlD.controls[0].touched).toBeTruthy();
      expect(formGroup.controls.controlD.controls[0].dirty).toBeTruthy();
      expect(formGroup.controls.controlD.controls[1].touched).toBeFalsy();
      expect(formGroup.controls.controlD.controls[1].dirty).toBeFalsy();
    });
  });

  describe('getValidatedStatus', () => {
    it('should override handler for invalid control and return danger type', () => {
      const control = new FormControl('', [Validators.required]);
      control.markAsTouched();
      control.markAsDirty();

      const handler = (): ControlStatus => 'primary';

      expect(getValidatedStatus(control, handler)).toBe('danger');
    });

    it('should return handler result for valid control', () => {
      const control = new FormControl('');
      control.markAsTouched();
      control.markAsDirty();

      const handler = (): ControlStatus => 'primary';

      expect(getValidatedStatus(control, handler)).toBe('primary');
    });
  });
});
