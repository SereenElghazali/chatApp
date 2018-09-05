import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
  userName: (arg0: any, arg1: any) => any;
  unread: Observable<{}[]>;
  
  
  msgList: Observable<any>;
  roomName: string;
  chatRoom: string;
  userId: any;
  @Input() user: User;
  @Input() authId: string;
  @Output() openChat = new EventEmitter<any>();
  @Output() openChatUser = new EventEmitter<any>();
  
  constructor(private chat:ChatService,private afDatabase:AngularFireDatabase) {


   }

  ngOnInit() {
    this.userName=this.user.displayName;
    this.chatRoom=this.getChatRoom();
    this.msgList = this.chat.getUserMessages(this.chatRoom);
    this.unread = this.chat.getUnreadMsg(this.chatRoom,this.userName)
    
  }
  openChatRoom($event){
    this.chatRoom=this.getChatRoom();
    event.preventDefault();
    this.openChatUser.emit(this.user)
    this.openChat.emit(this.roomName)
   }
   getChatRoom(){
    this.userId=this.user.uid;
    console.log(this.userId,"from user item")
    return this.roomName = 'chat_'+(this.authId<this.userId ? this.authId+'_'+this.userId : this.userId+'_'+this.authId);
    //console.log("Room Name"+this.authId+', '+this.userId+' => '+ this.roomName,"from user item");
   }


}
