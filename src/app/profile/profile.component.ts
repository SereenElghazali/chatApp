import { Component, OnInit } from '@angular/core';
import { CropperSettings } from 'ng2-img-cropper';
import { ViewChild } from '@angular/core';
import { User } from 'src/app/models/user';
import { ChatService } from 'src/app/services/chat.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId:string;
  imagrurl: any;
  choosingImage:boolean;
  data: any;
  cropperSettings: CropperSettings;
  @ViewChild('f') form: any;
  imageUrl: void;
  displayName: string;
  users: User[];
  progress: { percentage: number } = { percentage: 0 };
  constructor(private chat:ChatService,
    public fire: AngularFireAuth,
    private router:Router,
    private authService:AuthService) {
    this.fire.authState.subscribe(auth=>{
      if(auth){
        this.userId=auth.uid
        console.log("new uid",this.userId )
        this.chat.getUser().subscribe(users => {
            this.users = users;
            this.displayName=users.displayName;
            this.imageUrl=users.url;
            console.log("new f", this.displayName)
            console.log("this.imageUrl", this.imageUrl)
          });
      }
    })
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
     //this.uploadService.pushFileToStorage(this.data.image.split(/,(.+)/)[1],this.progress,this.imagrurl);
     
     const randomId = Math.random().toString(36).substring(2);
      const storageRef = firebase.storage().ref();
     
      const uploadTask = storageRef.child(randomId).putString(this.data.image.split(/,(.+)/)[1], 'base64', {contentType: 'image/png'});
      
       
 
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          // in progress
         const snap = snapshot as firebase.storage.UploadTaskSnapshot;
          this.progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
        },
        (error) => {
          
          // c
          
        },
        () => {
          // success
          
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            console.log('File available at', downloadURL);
            
            this.imagrurl= downloadURL;
            console.log('this.imagrurl', this.imagrurl);
           // user.url = downloadURL;
          
          });
        }
      );
    }
   
    this. choosingImage=false;
    
  }
  onSubmit() {
    if(this.form.valid) {
    
   
   this.authService.updateUserData(this.userId,this.displayName,this.imagrurl);
    
     this.router.navigate(['home']);
       
       } else {
      console.log('Invalid Form ');
     }

    
   }


}
