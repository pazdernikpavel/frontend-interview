import { Routes } from '@angular/router';

import { AuthRoute } from './auth.route.enum';
import { LoginComponent } from '../components/login/login.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';

export const authRoutes: Routes = [
  {
    path: '',
    redirectTo: AuthRoute.Login,
    pathMatch: 'full',
  },
  {
    path: AuthRoute.SignUp,
    component: SignUpComponent,
  },
  {
    path: AuthRoute.Login,
    component: LoginComponent,
  },
];
