import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { environment } from '../environments/environment';
import { ChatComponent } from './chat/chat.component';
import { ProfileComponent } from './profile/profile.component';
import RoutesModule from './routes.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { UserListComponent } from './user-list/user-list.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ChatFormComponent } from './chat-form/chat-form.component';
import { UserItemComponent } from './user-item/user-item.component';
import { UserSearchComponent } from './user-search/user-search.component';
import {EmojiPickerModule} from 'ng-emoji-picker';
import { MessageComponent } from './message/message.component';
import { UnreadMessageComponent } from './unread-message/unread-message.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ImageCropperComponent,
    ChatComponent,
    ProfileComponent,
    NavbarComponent,
    HeaderComponent,
    UserListComponent,
    ChatRoomComponent,
    ChatFormComponent,
    UserItemComponent,
    UserSearchComponent,
    MessageComponent,
    UnreadMessageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RoutesModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    EmojiPickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
