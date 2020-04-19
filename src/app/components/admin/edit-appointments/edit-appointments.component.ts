import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppointmentService } from 'src/app/shared/services/appointment.service';
import { ModalService } from '../modal';
import { Location } from '@angular/common';
import { Appoint } from '../../../shared/model/appoint';
import { ActivatedRoute, Router } from '@angular/router';
export interface AppointId extends Appoint { aid: string; };

@Component({
  selector: 'app-edit-appointments',
  templateUrl: './edit-appointments.component.html',
  styleUrls: ['./edit-appointments.component.css']
})
export class EditAppointmentsComponent implements OnInit {
  items:Observable<any[]>
  appointments: Appoint[]
  show = false;
  constructor(public db: AngularFirestore, 
    public app: AppointmentService,
    private location: Location,
    private actRoute: ActivatedRoute,
    private router: Router) { 
      this.app.getAppointment().subscribe(data => {
        this.appointments = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data() as Appoint
          } 
        })
      });
  }

  editForm = new FormGroup ({
      uName : new FormControl ('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      lName : new FormControl ('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      selectStaff : new FormControl ('', [
        Validators.required
      ]),
      selectService : new FormControl ('', [
        Validators.required
      ]),
      selectDate : new FormControl ('', [
        Validators.required
      ]),
       selectTime : new FormControl ('', [
        Validators.required
      ])
    });



  get uName() {
    return this.editForm.get('uName');
  }
  get lName() {
    return this.editForm.get('lName');
  }
  get selectStaff() {
    return this.editForm.get('selectStaff');
  }
  get selectService() {
    return this.editForm.get('selectService');
  }
  get selectDate() {
    return this.editForm.get('selectDate');
  }
  get selectTime() {
    return this.editForm.get('selectTime');
  }
   create(appointment: Appoint){
    this.app.createAppointment(appointment);
  } 

   update(appointment: Appoint) {
    this.app.updateAppointment(appointment);
  }

  delete(id: string) {
    this.app.deleteAppointment(id);
  }
  goBack(){
    this.location.back();
  }




  ngOnInit() {

  }

  

}

