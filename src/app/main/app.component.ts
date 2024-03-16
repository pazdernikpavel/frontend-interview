import { ChangeDetectionStrategy, Component, inject, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { NbMenuItem, NbMenuService } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { asapScheduler, filter, map } from 'rxjs';

import { logoutActions } from '@app/auth/store/actions/logout.actions';
import { selectIsAuthenticated, selectUserEmail } from '@app/auth/store/auth.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly store = inject(Store);
  private readonly menuService = inject(NbMenuService);

  public readonly menuTag = 'user-menu';
  public readonly items: NbMenuItem[] = [{ title: 'Logout', ariaRole: 'button' }];
  public readonly isAuthenticated = this.store.selectSignal(selectIsAuthenticated);
  public readonly userEmail = this.store.selectSignal(selectUserEmail);

  private readonly selectedItem = toSignal(
    this.menuService.onItemClick().pipe(
      filter(({ tag }) => tag === this.menuTag),
      map(({ item }) => item.title),
    ),
  );

  constructor() {
    effect(() => {
      const selectedItem = this.selectedItem();
      switch (selectedItem) {
        case 'Logout':
          asapScheduler.schedule(() => this.store.dispatch(logoutActions.logoutUser()));
          break;
      }
    });
  }
}
