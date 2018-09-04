import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: Observable<firebase.User>;
  private authState: any;
  constructor(private firebaseAuth: AngularFireAuth, private afDatabase:AngularFireDatabase,private router:Router) {
      this.user = firebaseAuth.authState;
      console.log(" this.user = firebaseAuth.authState;"+ this.user )
      
  }

  authUser() {
    return this.firebaseAuth.authState;
  }

signup(email: string, password: string,displayName: string,url:String): Promise<any> {
    return this.firebaseAuth.auth
       .createUserWithEmailAndPassword(email, password)
       .then((user) => {
         this.authState = user;
         status = 'online';
         this.setUserData(email, displayName, status,url);
       }).catch(error => console.log(error))
       .then(resolve => this.router.navigate(['home']));
      
      
   }

   setUserData(email: string, displayName: string, status: string,url:String): void {
    
    this.firebaseAuth.authState.subscribe(
      (auth) => {
        if (auth) { 
         const data = {
          uid:auth.uid.substring(10),
          email: email,
          displayName: displayName,
          status: status,
          url:url
          
        };
        this.afDatabase.object('users/'+ auth.uid).update(data)
        .then(path => {
          console.log('Nice, it worked!');
          console.log('users/' + auth.uid);
        })
          .catch(error => console.log(error));
        }
        
      });
    
    

    
  }


  login(email: string, password: string) {
    this.firebaseAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        status = 'online';
        this.updateUserStatus(status);
      
  })
  
  
}



updateUserData(userId:string,displayName?:string,url?:String){
  
  console.log("update1")
  this.firebaseAuth.authState.subscribe(
   (auth) => {
     if (auth != null) {

       
    
  console.log("update2")
  this.afDatabase.object('users/'+userId ).update({displayName:displayName});
   this.afDatabase.object('users/'+userId ).update({url:url})
  .then(path => {
     console.log('Nice, it worked!');
  
    })
   .catch(error => console.log(error));
   console.log("update3")
 
  }
  })
  }


updateUserStatus(status:String){
    this.firebaseAuth.authState.subscribe(
    (auth) => {
      if (auth != null) {
    this.afDatabase.object('users/'+auth.uid ).update({status:status})

    .then(path => {
    console.log('Nice, it worked! updateUserStatus');

    })
    .catch(error => console.log(error));


       }
     })
    }

logout() {
    status="offline";
    this.updateUserStatus(status);
    console.log("signout")
    this.firebaseAuth.auth.signOut();
}
}



