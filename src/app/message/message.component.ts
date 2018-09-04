import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { ChatMsg } from 'src/app/models/chat-msg';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  urlE: boolean=false;
  url: string;
  
  @Input() chatMessage: ChatMsg;
  userEmail: string;
  userName: string;
  messageContent: string;
  timeStamp: Date = new Date();
  isOwnMessage: boolean;
  ownEmail: string;
  constructor(private chat:ChatService,
    private userService:UserService,
    private authService: AuthService) {
      this.authService.authUser().subscribe(auth=>{
        if(auth){
          this.userService.getUser().subscribe(users => {
            this.ownEmail = users.email;
            this.isOwnMessage = this.ownEmail === this.userEmail;
            console.log(" this.isOwnMessage"+ this.isOwnMessage)
           
           });
       }
     })
     
     }

     ngOnInit(chatMessage = this.chatMessage) {
      this.messageContent = chatMessage.message;
      this.timeStamp = chatMessage.timeSent;
      this.userName = chatMessage.userName;
      this.userEmail=chatMessage.email;
      this.url=chatMessage.url

      if(this.url){
        this.urlE=true;
      }

      
    }

}
