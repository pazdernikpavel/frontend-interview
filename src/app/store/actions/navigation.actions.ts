import { createActionGroup, props } from '@ngrx/store';

export const ROOT_PATH = { path: ['/'] };

export const navigationActions = createActionGroup({
  source: 'Navigation',
  events: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    navigateTo: props<{ path: any[] }>(),
  },
});
