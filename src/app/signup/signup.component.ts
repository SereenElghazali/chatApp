import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { CropperSettings } from 'ng2-img-cropper';
import { UploadService } from 'src/app/services/upload.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  imagrurl: string;
  choosingImage:boolean;
  data: any;
  cropperSettings: CropperSettings;
  @ViewChild('f') form: any;
  email:string="";
  password:string="";
  username:string="";
  
  error: string;
 
  
  progress: { percentage: number } = { percentage: 0 };


  constructor(private uploadService:UploadService,private authService: AuthService,private router:Router) {

    this.cropperSettings = new CropperSettings();
        this.cropperSettings.width = 100;
        this.cropperSettings.height = 100;
        this.cropperSettings.croppedWidth = 100;
        this.cropperSettings.croppedHeight = 100;
        this.cropperSettings.canvasWidth = 400;
        this.cropperSettings.canvasHeight = 300;
        this.cropperSettings.rounded=true;
        this.data = {};
   }

  ngOnInit() {
  }
chooseImage(){
    this. choosingImage=true;
  }
  SaveImage(){
    if(this.data && this.data.image){
    this.imagrurl=this.uploadImage(this.data.image,this.progress);
    // console.log("signup"+this.imagrurl)

    }
    this. choosingImage=false;
}
onSubmit() {
  if(this.form.valid) {
    console.log("yes1");
    this.authService.signup(this.email, this.password,this.username,this.imagrurl)
      //this.form.reset();
     } else {
    console.log('Invalid Form ');
   }

  
 }

 uploadImage(image,progress):any{
  const randomId = Math.random().toString(36).substring(2);
  const storageRef = firebase.storage().ref();
  const uploadTask = storageRef.child(randomId).putString(image.split(/,(.+)/)[1], 'base64', {contentType: 'image/png'});
  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
    (snapshot) => {
      // in progress
     const snap = snapshot as firebase.storage.UploadTaskSnapshot;
      progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
    },
    (error) => {},
    () => {
      // success
      uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
        //console.log('File available at', downloadURL);
       
        this.imagrurl= downloadURL;

      });
     
    }
  );
}
}
