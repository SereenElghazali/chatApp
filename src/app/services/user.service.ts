import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { concat } from 'rxjs/internal/observable/concat';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: firebase.User;

  private authState: any;
  userName: Observable<string>;
  constructor(private firebaseAuth: AngularFireAuth,
    private afDatabase:AngularFireDatabase) {
      this.firebaseAuth.authState.subscribe(auth => {
        if (auth ) {
          this.user = auth;
          console.log("new ",this.user.uid)
        }
        this.getUser().subscribe(a => {
          this.userName = a.displayName;
       
        });
      });
    }



    getUser():Observable<any> {
      return this.afDatabase.object('users/'+ this.user.uid).valueChanges();
    }


    getUsers():Observable<any> {
      const path = '/users';
      return this.afDatabase.list(path).valueChanges();
      }
      getUsersSearch(name){
        return this.afDatabase.list('/users', ref => ref.orderByChild('displayName').equalTo(name)).valueChanges();
       
    }
}
