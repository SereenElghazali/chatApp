import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  authId: any;
  users: {}[];
  @Output() openChatUser = new EventEmitter<any>();
  @Output() openChatUsers = new EventEmitter<any>();
  constructor(private userService:UserService,
    private authService: AuthService,) {
      this.authService.authUser().subscribe(auth=>{
        if(auth){
          this.userService.getUser().subscribe(users => {
            
            this.authId=users.uid;
            //console.log("this.uid=users.uid from user item from constructor",this.authId) 
           });
       }
     })
     userService.getUsers().subscribe(users => {
      this.users = users;
     // console.log(this.users)
     console.log(" chat.getUsers()")
    });
     }

  ngOnInit() {
  }
  Search(user){
    if(!user){
      this.userService.getUsers().subscribe(users => {
        this.users = users;
       
      });
    }else{
      this.userService.getUsersSearch(user).subscribe(users =>{
        this.users = users;
        console.log(this.users)
       console.log(" this.chat.getUsersSearch")
      });
    }
   
  }

  OpenchatUser(user){
    this.openChatUsers.emit(user)
  }
  Openchat(roomName){
    this.openChatUser.emit(roomName)
  }
}
