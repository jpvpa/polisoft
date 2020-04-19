import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable} from 'rxjs';
import { Router } from '@angular/router';
import {finalize} from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { Appoint} from '../model/appoint'

interface Fileappoint {
  name: string;
  imageFile: File;
  size: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  

 /*  appointment: Observable<Appoint[]>;
  appoint: Observable<Appoint>;
  appointmentObs: Observable<any>;
 */
   
  
  
  private appointmentsCollection: AngularFirestoreCollection<Appoint>;
  private filePath: any;
  private downloadURL: Observable<string>;

  constructor(
    private db: AngularFirestore,
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
  ) { 
    this.appointmentsCollection = afs.collection<Appoint>('appointments');
  }
 preAddAndUpdateAppointment(appointment: Appoint, image: Fileappoint): void {
    this.uploadImage(appointment, image);
    console.log(appointment);
    console.log(image);
  }
  saveAppointment(appointment: Appoint) {
    const appointObj = {
      uName: appointment.uName,
      lName: appointment.lName,
      nailPhoto: this.downloadURL,
      fileRef: this.filePath,
      selectStaff: appointment.selectStaff,
      selectService: appointment.selectService,
      selectDate: appointment.selectDate,
      selectTime: appointment.selectTime
    };
    console.log(appointObj)
    if (appointment.id) {
      console.log(appointObj)
      console.log(appointment.id)
      return this.appointmentsCollection.doc(appointment.id).update(appointObj);
    } else {
      console.log(appointObj)
      return this.appointmentsCollection.add(appointObj);
    }
  }

  uploadImage(appointment: Appoint, image: Fileappoint) {
    this.filePath = `appointment-uploads/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            this.downloadURL = urlImage;
            this.saveAppointment(appointment);
            console.log(appointment)
            console.log(this.downloadURL);
          });
        })
      ).subscribe();
  }


  //CRUD
  getAppointment() {
    return this.db.collection('appointments').snapshotChanges();
  }
  
  createAppointment(appointment: Appoint){
    console.log(appointment);
    return this.db.collection('appointments').add(appointment);
  }
  updateAppointment(appointment: Appoint){
    delete appointment.id;
    this.db.doc('appointments/' + appointment.id).update(appointment);
  } 
  deleteAppointment(appointId: string){
    this.db.doc('appointments/' + appointId).delete();
}

  ngOnInit() {
  }




 
}
