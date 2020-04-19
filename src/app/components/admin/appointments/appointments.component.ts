import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AppointmentService } from 'src/app/shared/services/appointment.service';
import { ModalService } from '../modal';
import { Appoint } from '../../../shared/model/appoint'
import { AngularFireList, AngularFireObject } from '@angular/fire/database';
export interface AppointId extends Appoint { aid: string; };

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  items:Observable<any[]>
  appointments: Appoint[]
  show = false;
  constructor(public db: AngularFirestore, 
    public app: AppointmentService,
    private modalService: ModalService) { 
  }
  visibleIndex = -1;
  showSubItem(ind) {
    if (this.visibleIndex === ind) {
      this.visibleIndex = -1;
    } else {
      this.visibleIndex = ind;
    }
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
  ngOnInit() {

   this.app.getAppointment().subscribe(data => {
      this.appointments = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Appoint
        } 
      })
    });
    
  }


  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
      this.modalService.close(id);
  }

  

}