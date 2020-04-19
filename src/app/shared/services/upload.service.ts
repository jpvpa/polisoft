
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class UploadService {
  uploadPercent: Observable<number>;

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private storage: AngularFireStorage,
    /* private groupService: GroupService */
  ) { }
  downloadURL: Observable<string>
  uploadTask;

  // Execute file upload to firebase storage
  pushUpload(file, type?: string, id?: string) {
    if (type === 'user') {
      const task = this.storage.upload('user-uploads/' + id + '/dp', file)
      const ref = this.storage.ref('user-uploads/' + id + '/dp');
      this.uploadPercent = task.percentageChanges();
      console.log('Image uploaded!');
      task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = ref.getDownloadURL()
          this.downloadURL.subscribe(url => {
            if (url) {
              this.auth.updatePhotoURL(url);
            }
          });
        })
  )
  .subscribe();
    } 
}
}   