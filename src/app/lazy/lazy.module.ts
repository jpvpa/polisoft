import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../components/home/home.component';
import { StaffComponent } from '../components/staff/staff.component';
import { MeetingComponent } from '../components/meeting/meeting.component';
import { NewsComponent } from '../components/news/news.component';
import { ContactComponent } from '../components/contact/contact.component';
import { SignInComponent } from '../components/user/sign-in/sign-in.component';
import { SignUpComponent } from '../components/user/sign-up/sign-up.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'staff', component: StaffComponent},
  { path: 'meeting', component: MeetingComponent},
  { path: 'news', component: NewsComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'sign-in', component: SignInComponent},
  { path: 'register-user', component: SignUpComponent}
];
@NgModule({
  declarations: [
    HomeComponent,
    StaffComponent,
    MeetingComponent,
    ContactComponent,
    SignInComponent,
    SignUpComponent,
  ],
  imports: [
    CommonModule,RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LazyModule { }
