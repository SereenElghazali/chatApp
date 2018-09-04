import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { ChatMsg } from 'src/app/models/chat-msg';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';

import { Observable } from 'rxjs';


@Component({
  selector: 'app-unread-message',
  templateUrl: './unread-message.component.html',
  styleUrls: ['./unread-message.component.css']
})
export class UnreadMessageComponent implements OnInit {
 
 
  
  
  
  isOwnMessage: boolean;
  userName: string;
  @Input() message: ChatMsg;
  
  @Input() chatRoom:string;
  ownUserName: string;
  constructor(private chat:ChatService,
    private userService:UserService,
    private authService: AuthService,
    private afDatabase:AngularFireDatabase) {
      
      this.authService.authUser().subscribe(auth=>{
        if(auth){
          this.userService.getUser().subscribe(users => {
            this.ownUserName = users.userName;
            this.isOwnMessage = this.ownUserName === this.userName;
            

           })
           }
           
     })
    }

     ngOnInit(chatMessage = this.message) {
     this.userName = chatMessage.userName;
     
          
     }
     
    }


