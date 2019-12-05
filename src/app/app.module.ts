import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {InitComponent} from './component/init/init.component'

import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AngularFireModule} from '@angular/fire';
import { firebaseConfig} from '../environments/environment.prod';

import { AngularFireAuthModule} from '@angular/fire/auth';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { NativeKeyboard } from '@ionic-native/native-keyboard/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { VentanaChatComponent } from './component/ventana-chat/ventana-chat.component';
import { RegisterComponent } from './component/register/register.component';
import { ListUserComponent } from './component/list-user/list-user.component';
import { ListUserSAComponent } from './component/list-user-Sadmin/list-user.component';
import { HttpClientModule } from '@angular/common/http';
import { FCM } from '@ionic-native/fcm/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { AddNotaComponent } from './component/add-nota/add-nota.component';

import { Camera } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { WebView } from '@ionic-native/ionic-webview/ngx';


@NgModule({
  declarations: [ AppComponent,InitComponent,ListUserComponent,RegisterComponent,VentanaChatComponent, AddNotaComponent,ListUserSAComponent ],
  entryComponents: [InitComponent,ListUserComponent,RegisterComponent,VentanaChatComponent, AddNotaComponent,ListUserSAComponent ],
  imports: [
    BrowserModule, AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    
  
  ],
  
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    WebView,
    Camera,
    Base64,
  
    LocalNotifications,
    FCM,
    Keyboard,
    NativeKeyboard,
    StatusBar,
    BackgroundMode,
    { provide: FirestoreSettingsToken, useValue: {} },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
