import { Injectable } from '@angular/core';
import { Appoint} from '../model/appoint'
import { AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class NavbarServiceService {

  appointmentsRef: AngularFireList<any>;
  appointmentRef: AngularFireObject<any>;  

  private appointmentsCollection: AngularFirestoreCollection<Appoint>;
  constructor(private afs: AngularFirestore,){
    this.appointmentsCollection = afs.collection<Appoint>('appointments'); 
  }
  addAppointment(appointment: Appoint){
    this.appointmentsCollection.add(appointment)
    console.log(appointment);
  }
}