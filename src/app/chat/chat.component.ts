import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  msgList: Observable<any>;
  user: any;
  userId: any;
  roomName: string;
  authId:string;
  users: User[];
  constructor(private userService:UserService,
    private authService: AuthService,) {
      this.authService.authUser().subscribe(auth=>{
        if(auth){
          this.userService.getUser().subscribe(users => {
            
            this.authId=users.uid;
            console.log("this.uid=users.uid from chat from constructor",this.authId) 
           });
       }
     })}

  ngOnInit() {
  }
  Openchatusers(user){
    this.user=user;
  }
  Openchatuser(roomName){
    this.roomName=roomName;
    
    console.log("roomName from chat",roomName)
  }
}
