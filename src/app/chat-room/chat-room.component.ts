import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {

  @Input() roomName: any;
  
  
  msgList: Observable<any[]>;
  constructor(private chat:ChatService) { }

  ngOnInit() {
    this.msgList = this.chat.getMessages(this.roomName);
    console.log(this.msgList)
  }

  ngOnChanges() {

    this.msgList = this.chat.getMessages(this.roomName);
    console.log("this.msgList",this.msgList)
  }
}
