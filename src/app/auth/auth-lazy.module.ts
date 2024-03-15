import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { authRoutes } from './routing/auth.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(authRoutes), LoginComponent, SignUpComponent],
})
export class AuthLazyModule {}
