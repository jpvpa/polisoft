import { Component, OnInit, ViewChild, NgModule, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AppointmentService } from 'src/app/shared/services/appointment.service';
import { DateButton } from 'angular-bootstrap-datetimepicker';
import { unitOfTime } from 'moment';
import * as moment from 'moment';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { NavbarServiceService } from 'src/app/shared/services/navbar-service.service';
import { Appoint } from '../../shared/model/appoint';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export interface Task {
  selectService: string;
  selectDate: string;
  selectTime: string;
}

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})

export class MeetingComponent implements OnInit {
  @ViewChild('tipo', { static: true }) tipo: ElementRef;
  @ViewChild('color', { static: true }) color: ElementRef;
  @ViewChild('diseno', { static: true }) diseno: ElementRef;

  //Variables
  e: any;
  isTaken = false;
  disablePastDates = true;
  disable: any = false;
  filename = 'Show us your idea!';
  clicked: false;
  displayName;
  userName;
  naiPhoto: string
  uid;
  isAdmin: boolean;
  isUser: boolean;

  //Display appointments
  private taskCollection: AngularFirestoreCollection<Task>;
  tasks: Observable<Task[]>;

  constructor(
    private userService: UserService,
    private titleService: Title,
    private fb: FormBuilder,
    public db: AngularFirestore,
    private storage: AngularFireStorage,
    public app: AppointmentService,
    private afs: AngularFirestore,
    private auth: AuthService,
    private nav: NavbarServiceService,
    private router: Router
  ) {
    //Fetch by Firestore
    this.taskCollection = this.afs.collection<Task>('task');
    this.tasks = this.taskCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Task;
        return { ...data };
      })
    }))
  }

  ngOnInit() {
    this.titleService.setTitle('Meeting');
    this.actualizarImagen(this.e);
    /* this.booking(); */
    this.isAdmin = false;
    this.isUser = false;
    this.getUserData();
  }

  //FORM VALIDATION
  meetingForm = new FormGroup({
    uName: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    lName: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    selectStaff: new FormControl('', [
      Validators.required
    ]),
    selectService: new FormControl('', [
      Validators.required
    ]),
    selectDate: new FormControl('', [
      Validators.required
    ]),
    selectTime: new FormControl('', [
      Validators.required
    ]),
    nailShape: new FormControl('', [
      Validators.required
    ]),
    nailColor: new FormControl('', [
      Validators.required
    ]),
    nailDesign: new FormControl('', [
      Validators.required
    ]),
    specifyDesign: new FormControl('', [
      Validators.required
    ]),
    nailPhoto: new FormControl('', [
      Validators.required
    ])
  });

  get uName() {
    return this.meetingForm.get('uName');
  }
  get lName() {
    return this.meetingForm.get('lName');
  }
  get selectStaff() {
    return this.meetingForm.get('selectStaff');
  }
  get selectService() {
    return this.meetingForm.get('selectService');
  }
  get selectDate() {
    return this.meetingForm.get('selectDate');
  }
  get selectTime() {
    return this.meetingForm.get('selectTime');
  }
  get nailShape() {
    return this.meetingForm.get('nailShape');
  }
  get nailColor() {
    return this.meetingForm.get('nailColor');
  }
  get nailDesign() {
    return this.meetingForm.get('nailDesign');
  }
  get specifyDesign() {
    return this.meetingForm.get('specifyDesign');
  }
  get nailPhoto() {
    return this.meetingForm.get('nailPhoto');
  }

  ngAfterViewInit() {
    document.getElementById('tipo');
    document.getElementById('color');
    document.getElementById('diseno');
  }

  //BUTTONS 
  image: any;
  booking(data: Appoint) {
    if (!this.selectStaff.errors
      && !this.selectService.errors) {
      this.app.preAddAndUpdateAppointment(data, this.image);
      console.log(this.image);
      console.log(data);
    }
    this.resetForm();
  }

  book() {
    if (!this.selectStaff.errors
      && !this.selectService.errors) {
      this.nav.addAppointment(this.meetingForm.value)
      console.log(this.meetingForm.value)
    }
    this.router.navigateByUrl('/meeting');
    this.resetForm(); //Clean after click the button
  }

  resetForm() {
    this.disable = false;
    this.clicked = false;
    this.meetingForm.reset();
  }

  chooseImage(event: any): void {
    this.image = event.target.files[0];
    console.log(this.image);
  }

  //SHOW NAIL IMAGE
  actualizarImagen(e) {
    console.log(this.tipo.nativeElement.value + ' / ' + this.color.nativeElement.value + '/' + this.diseno.nativeElement.value);
    if (document.images) {
      document.images['tipoDe'].src = '../../../assets/images/img/' + this.tipo.nativeElement.value + '/' + this.color.nativeElement.value + '/' + this.diseno.nativeElement.value + '.png';
    }
    this.nailShape.setValue(this.tipo.nativeElement.value, {
      onlySelf: true
    })
    this.nailColor.setValue(this.color.nativeElement.value, {
      onlySelf: true
    })
    this.nailDesign.setValue(this.diseno.nativeElement.value, {
      onlySelf: true
    })
  }

  //CALENDAR
  endDate: Date;
  minDuration = 0;
  startDate: Date;

  datePickerFilter = (dateButton: DateButton, viewName: string, ) => {
    return this.disablePastDates ? dateButton.value >= moment().startOf(viewName as unitOfTime.StartOf).valueOf() : true;
  }

  search($event) {
    const q = $event.target.value;
    this.checkDate(q);
  }

  checkDate(q) {
    this.afs.collection('appointments', ref => ref.where('selectTime', '==', q)).valueChanges().subscribe(date => {
      if (date[0]) {
        this.isTaken = true;
      } else {
        this.isTaken = false;
      }
    });
  }

  //if the user or admin are logged instead of asking for their personal information, the data will display by itself
  getUserData() {
    this.auth.getAuthState().subscribe(
      user => {
        if (user) {
          this.isUser = true;
          this.userService.retrieveUserDocument(user.uid).subscribe(
            userDoc => {
              if (userDoc) {
                this.displayName = userDoc.displayName;
                this.userName = userDoc.userName;
                this.uid = userDoc.uid;
                this.auth.isUserAdmin(this.uid).subscribe(userRole => {
                  this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
                });
              }
              console.log(userDoc);
            });
        } else {
          this.isUser = false;
          this.isAdmin = false;
        }
      });
  }
  
  logout() {
    this.isAdmin = false;
    this.isUser = false;
    this.auth.logout();
  }
} //End class