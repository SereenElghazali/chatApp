import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { SignupComponent } from 'src/app/signup/signup.component';
import { ChatComponent } from 'src/app/chat/chat.component';
import { ProfileComponent } from 'src/app/profile/profile.component';


const routes: Routes = [
    // basic routes
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'home', component:ChatComponent},
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'profile', component: ProfileComponent}
  ];
  export default RouterModule.forRoot(routes);