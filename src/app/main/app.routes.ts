import { Routes } from '@angular/router';

import { authGuard } from '@app/auth/guards/auth.guard';
import { AppRoute } from './app.route.enum';

export const appRoutes: Routes = [
  {
    path: AppRoute.Auth,
    loadChildren: () => import('../auth/auth-lazy.module').then(m => m.AuthLazyModule),
  },
  {
    path: '',
    canActivate: [authGuard()],
    children: [
      {
        path: AppRoute.Transaction,
        loadChildren: () =>
          import('../pages/transaction/transaction.module').then(m => m.TransactionModule),
      },
      {
        path: '**',
        redirectTo: AppRoute.Transaction,
      },
    ],
  },
];
