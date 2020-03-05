import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { StaffComponent } from './components/staff/staff.component';
import { MeetingComponent } from './components/meeting/meeting.component';
import { NewsComponent } from './components/news/news.component';
import { ContactComponent } from './components/contact/contact.component';
import { SignInComponent } from './components/user/sign-in/sign-in.component';
import { SignUpComponent } from './components/user/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/user/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/user/verify-email/verify-email.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';

// Import canActivate guard services
import { AuthGuard } from "./shared/guard/auth.guard";
import { SecureInnerPagesGuard } from "./shared/guard/secure-inner-pages.guard";

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'staff', component: StaffComponent},
  { path: 'meeting', component: MeetingComponent},
  { path: 'news', component: NewsComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'sign-in', component: SignInComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'register-user', component: SignUpComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'verify-email-address', component: VerifyEmailComponent, canActivate: [SecureInnerPagesGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
