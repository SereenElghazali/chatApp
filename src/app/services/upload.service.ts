import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { Observable } from 'rxjs';
import { FileUpload } from 'src/app/models/file-upload';
@Injectable({
  providedIn: 'root'
})
export class UploadService {
  email: any;
  userName: any;
  imagrurl: any;
  user: firebase.User;
  private authState: any;
  //private basePath = '/uploads';
  constructor(private firebaseAuth: AngularFireAuth, private afDatabase:AngularFireDatabase) { 
    this.firebaseAuth.authState.subscribe(auth => {
      if (auth ) {
        this.user = auth;
        console.log("new ",this.user.uid)
      }
      this.getUser().subscribe(a => {
        this.userName = a.displayName;
        this.email=a.email
     
      });
    });
  }
  getUser():Observable<any> {
    return this.afDatabase.object('users/'+ this.user.uid).valueChanges();
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
private basePath = '/uploads';
pushFileToStorage(image, progress: { percentage: number },chatRoom,read) {
  console.log("x3")
  const randomId = Math.random().toString(36).substring(2);
  const storageRef = firebase.storage().ref();
  const uploadTask = storageRef.child(randomId).put(image);
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
        
        this.saveFileData(downloadURL,chatRoom,read);
      
      });
     
    }
  );
}



private saveFileData(downloadURL,chatRoom,read) {
  console.log("send22")
      const timestamp = this.getTimeStamp();
      console.log("send33")
      const chatMessages = this.afDatabase.list('messages/'+chatRoom).push({
        url:downloadURL,
        timeSent: timestamp,
        userName: this.userName,
        read:read,
        email:this.email
    });
    
     console.log("message sent")
    }
    getTimeStamp() {
      const now = new Date();
      const date = now.getUTCFullYear() + '/' +
                   (now.getUTCMonth() + 1) + '/' +
                   now.getUTCDate();
      const time = now.getUTCHours() + ':' +
                   now.getUTCMinutes() + ':' +
                   now.getUTCSeconds();
  
      return (date + ' ' + time);
    }
  
}

