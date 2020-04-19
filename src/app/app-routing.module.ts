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
import { UpdateDashboardComponent } from './components/user/update-dashboard/update-dashboard.component';
import { DashboardAdminComponent } from './components/admin/dashboard-admin/dashboard-admin.component';
import { UserListComponent } from './components/admin/user-list/user-list.component';
import { AppointmentsComponent } from './components/admin/appointments/appointments.component';
import { UpdateDashboardAdminComponent } from './components/admin/update-dashboard-admin/update-dashboard-admin.component';
import { EditAppointmentsComponent } from './components/admin/edit-appointments/edit-appointments.component';
import { LoadingComponent } from './loading/loading.component';
import { NewsListComponent } from './components/admin/news/news-list/news-list.component';
import { NewsEditComponent } from './components/admin/news/news-edit/news-edit.component';
import { NewsAddComponent } from './components/admin/news/news-add/news-add.component';
// Import canActivate guard services
/* import { AuthGuard } from "./shared/guard/auth.guard";
import { SecureInnerPagesGuard } from "./shared/guard/secure-inner-pages.guard"; */

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'staff', component: StaffComponent},
  { path: 'meeting', component: MeetingComponent},
  { path: 'news', component: NewsComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'sign-in', component: SignInComponent},
  { path: 'register-user', component: SignUpComponent},
  { path: 'dashboard/:username', component: DashboardComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent},
  { path: 'update-dashboard', component: UpdateDashboardComponent},
  { path: 'dashboard-admin/:username', component: DashboardAdminComponent},
  { path: 'user-list', component: UserListComponent},
  { path: 'appointments', component: AppointmentsComponent},
  { path: 'update-dashboard-admin', component: UpdateDashboardAdminComponent},
  { path: 'edit-appointments/:id', component: EditAppointmentsComponent },
  { path: 'loading', component: LoadingComponent },
  { path: 'news-list', component: NewsListComponent },
  { path: 'news-edit', component: NewsEditComponent },
  { path: 'news-add', component: NewsAddComponent },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
