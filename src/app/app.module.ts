import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

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
/* import { RegisterComponent } from './components/user/register/register.component'; */
import { SignUpComponent } from './components/user/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/user/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/user/verify-email/verify-email.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';

//Services
import { AuthService } from "./shared/services/auth.service";

//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { FooterComponent } from './components/footer/footer.component';
import { AngularFireDatabaseModule } from '@angular/fire/database';

//FontAwesome - icons
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
//Calendar
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { FormsModule } from '@angular/forms';

var firebaseConfig = {
  apiKey: "AIzaSyBPYfWHdYBnmz_Ki3UA2jtS4kJbkdWIZ6k",
  authDomain: "polisoft-4894b.firebaseapp.com",
  databaseURL: "https://polisoft-4894b.firebaseio.com",
  projectId: "polisoft-4894b",
  storageBucket: "polisoft-4894b.appspot.com",
  messagingSenderId: "491307709406",
  appId: "1:491307709406:web:505e71a84c92ed55bc234f",
  measurementId: "G-LES7R09QGS"
};

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
    /* RegisterComponent, */
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    DashboardComponent,
    FooterComponent
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
    FormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
