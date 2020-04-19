import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsernameValidators } from 'src/app/validators/username.validators';
import { AngularFirestore } from '@angular/fire/firestore';
import { UploadService } from 'src/app/shared/services/upload.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-update-dashboard',
  templateUrl: './update-dashboard.component.html',
  styleUrls: ['./update-dashboard.component.css']
})
export class UpdateDashboardComponent implements OnInit {

  photoURL = '../../../../assets/images/nail-polish.png';
  userName = 'Enter Username';
  displayName = 'Enter Displayname';
  status = 'Enter status';
  uid;

  currentusername;

  filename = 'Change Picture';
  inputFile;

  isTaken = false;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private router: Router,
    private titleService: Title,
    private uploadService: UploadService,
    private afs: AngularFirestore
  ) { }

  accountForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      UsernameValidators.cannotContainSpace,
      Validators.maxLength(15)
    ]),
    displayname: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30)
    ]),
    inputstatus: new FormControl('', [
      Validators.minLength(5),
      Validators.required,
      Validators.maxLength(100)
    ])
  });

  get username() {
    return this.accountForm.get('username');
  }
  get displayname() {
    return this.accountForm.get('displayname');
  }
  get inputstatus() {
    return this.accountForm.get('inputstatus');
  }

  ngOnInit() {
    this.titleService.setTitle('Update Dashboard');
    this.auth.getAuthState().subscribe(
      currentuser => {
        if (currentuser) {
          this.userService.retrieveUserDocument(currentuser.uid).subscribe(
            user => {
              if (user) {
                this.displayName = user.displayName;
                this.currentusername = user.userName;
                this.userName = user.userName;
                this.photoURL = user.photoURL;
                this.status = user.status;
                this.uid = user.uid;
              }
            });
        } else {
          this.router.navigateByUrl('sign-in');
        }
      });
  }

  search($event) {
    const q = $event.target.value;
    this.checkUsername(q);
  }

  checkUsername(q) {
    this.afs.collection('users', ref => ref.where('userName', '==', q)).valueChanges().subscribe(user => {
      const searchuser: any = user[0];
      if (user[0] && this.currentusername !== searchuser.userName) {
          this.isTaken = true;
      } else {
        this.isTaken = false;
      }
    });
  }

  update() {
    if (!this.isTaken && !this.username.errors && !this.displayname.errors && !this.inputstatus.errors) {
      this.auth.updateUser(this.displayName, this.userName, this.status).then(
        () => console.log('User details updated'));
    }
  }

   processImage(event) {
    this.inputFile = event.target.files[0];
    this.filename = this.inputFile.name;
    if (this.inputFile.size > 2000000) {
      this.filename = 'Max Filesize 2Mb!';
    } else {
      if (this.filename.length > 25) {
        this.filename = this.filename.slice(0, 25) + '...' + this.filename.slice(this.filename.length - 3);
      }
      this.uploadService.pushUpload(this.inputFile, 'user', this.uid);
    }
  } 

  sendTo(path) {
    if (path === 'dashboard') {
      this.router.navigateByUrl('dashboard/' + this.userName);
    }
  }

}
