import { Directive, computed, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';

import { map, switchMap } from 'rxjs';

import { getValidatedStatus } from '../utils/form.utils';

@Directive()
export class FormControlInput {
  public readonly appControl = input.required<FormControl>();
  public readonly controlValue = computed(() => this.appControl().value);

  public readonly controlStatus = toSignal(
    toObservable(this.appControl).pipe(
      switchMap(control => control.valueChanges.pipe(map(() => getValidatedStatus(control)))),
    ),
    { initialValue: 'basic' },
  );
}
