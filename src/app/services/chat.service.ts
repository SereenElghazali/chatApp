import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  email: any;
  user: firebase.User;
  private authState: any;
  userName: any;
  constructor(private firebaseAuth: AngularFireAuth,
    private afDatabase:AngularFireDatabase) {
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
  
    sendMessage(msg: string,path:string,read:string) {
      console.log("send2")
      const timestamp = this.getTimeStamp();
      console.log("send3")
      const chatMessages = this.afDatabase.list('messages/'+path).push({
        message: msg,
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
  
    getMessages(path:string): Observable<any> {
      return this.afDatabase.list('messages/'+path).valueChanges();
       
     }
     getUserMessages(chatRoom:string):any{
      return this.afDatabase.list('messages/'+chatRoom, ref =>ref.orderByChild('read').equalTo("false")).valueChanges();;
     }
     getUnreadMsg(x){
      return this.afDatabase.list('messages/'+x,  ref =>
      ref.orderByChild('read').equalTo("false")).valueChanges();
    
    
  }
  }
  
