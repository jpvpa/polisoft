import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from './components/admin/modal'

//Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
 import { HomeComponent } from './components/home/home.component';
import { StaffComponent } from './components/staff/staff.component';
import { MeetingComponent } from './components/meeting/meeting.component';
import { NewsComponent } from './components/news/news.component';
import { ContactComponent } from './components/contact/contact.component';
import { SignInComponent } from './components/user/sign-in/sign-in.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SignUpComponent } from './components/user/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/user/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/user/verify-email/verify-email.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';
import { UpdateDashboardComponent } from './components/user/update-dashboard/update-dashboard.component';
import { SidebarDashboardComponent } from './components/user/sidebar-dashboard/sidebar-dashboard.component';
import { DashboardAdminComponent } from './components/admin/dashboard-admin/dashboard-admin.component';
import { SidebarDashadminComponent } from './components/admin/sidebar-dashadmin/sidebar-dashadmin.component';
import { UserListComponent } from './components/admin/user-list/user-list.component';
import { AppointmentsComponent } from './components/admin/appointments/appointments.component';
import { UpdateDashboardAdminComponent } from './components/admin/update-dashboard-admin/update-dashboard-admin.component';
import { EditAppointmentsComponent } from './components/admin/edit-appointments/edit-appointments.component'
import { LoadingComponent } from './loading/loading.component';
import { NewsListComponent } from './components/admin/news/news-list/news-list.component';
import { NewsEditComponent } from './components/admin/news/news-edit/news-edit.component';
import { NewsAddComponent } from './components/admin/news/news-add/news-add.component';
//Services
import { AuthService } from "./shared/services/auth.service";
import { UserService } from "./shared/services/user.service";
import { UploadService } from './shared/services/upload.service';
import { AppointmentService } from './shared/services/appointment.service';
import { NewsService } from './components/admin/news/news.service'

//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { FooterComponent } from './components/footer/footer.component';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import * as firebase from "firebase";

//FontAwesome - icons
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
//Calendar
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DisablecontrolDirective } from './components/meeting/disablecontrol.directive';
import { MeetingDoneComponent } from './components/meeting-done/meeting-done.component';

firebase.initializeApp(environment.firebaseConfig);
@NgModule({
  declarations: [
    AppComponent,
     HomeComponent,
   StaffComponent,
    MeetingComponent,
    NewsComponent,
    ContactComponent,
    SignInComponent,
    NavBarComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    DashboardComponent,
    FooterComponent,
    UpdateDashboardComponent,
    SidebarDashboardComponent,
    DashboardAdminComponent,
    SidebarDashadminComponent,
    UserListComponent,
    AppointmentsComponent,
    UpdateDashboardAdminComponent,
    DisablecontrolDirective,
    EditAppointmentsComponent,
    LoadingComponent,
    NewsListComponent,
    NewsEditComponent,
    NewsAddComponent,
    MeetingDoneComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'polisoft'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule, // <---  Database
    HttpClientModule,
    DlDateTimeDateModule,  // <--- Calendar
    DlDateTimePickerModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ModalModule
  ],
  providers: [AuthService,UserService, UploadService, AppointmentService,  NewsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
