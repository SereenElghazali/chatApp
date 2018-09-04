import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { concat } from 'rxjs/internal/observable/concat';
import { UserService } from 'src/app/services/user.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  imageUrl: void;
  displayName: string;
  uid: string;
  email: string;
  users: User[];
  user: Observable<firebase.User>;
  constructor(private userService:UserService,
        private authService: AuthService,
        private router:Router) {

      this.authService.authUser().subscribe(auth=>{
      if(auth){
        this.userService.getUser().subscribe(users => {
           this.users = users;
            this.displayName=users.displayName;
            this.imageUrl=users.url;
            this.uid=users.uid;
            console.log("new f", this.displayName)
            console.log("this.uid=users.uid",this.uid)
            console.log("this.imageUrl", this.imageUrl)
          });
      }
    })
   }

  ngOnInit() {
  
   
  }
  openProfile($event){
    event.preventDefault();
    this.router.navigate(['profile']); 
  }
  signOut(){
    this.authService.logout();
    this.router.navigate(['login']); 
  }

}
