import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { UploadService } from 'src/app/services/upload.service';
import { FileUpload } from 'src/app/models/file-upload';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {
  sender: any;
  userName: any;
  unread: string;
  authEmail: any;
  file(arg0: any, arg1: any, arg2: any, arg3: any): any {
    throw new Error("Method not implemented.");
  }
  userStatus: any;
  userStat: void;
  read:string;
  @Input() roomName: any;
  @Input() user: any;
  text: string = '';
  openPopup: Function;
  constructor(private chat:ChatService,private uploadService:UploadService,private firebaseAuth: AngularFireAuth,
    private afDatabase:AngularFireDatabase) {
    this.firebaseAuth.authState.subscribe(auth => {
      if (auth ) {
        this.user = auth;
        console.log("new ",this.user.uid)
      }
      this.chat.getUser().subscribe(a => {
        this.sender = a.displayName;
        
     
      });
    });
  }
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: { percentage: number } = { percentage: 0 };
  ngOnInit() {
  }
  setPopupAction(fn: any) {
    console.log('setPopupAction');
    this.openPopup = fn;
  }
  sendMsg(){
    if(!this.text){

    }else{
    this.userStatus=this.user.status;
    if(this.userStatus=="offline"){
      this.unread=this.sender;
      this.chat.sendMessage(this.text,this.roomName,this.unread);
  }
 else if(this.userStatus=="online"){
  this.unread="";
  this.chat.sendMessage(this.text,this.roomName,this.unread);
 }
    //this.chat.sendMessage(this.text,this.roomName,this.unread);
    this.text="";
    //console.log("send2")
  }
}


upload(event) {
  this.file = event.target.files.item(0);
  this.read="true";
  //console.log("this.roomName; this.roomName; this.roomName; this.roomName;",this.roomName)
  this.uploadService.pushFileToStorage(this.file, this.progress,this.roomName,this.read);
}
}

