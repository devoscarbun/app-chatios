import { Component } from '@angular/core';

import { Platform, IonRouterOutlet } from '@ionic/angular';

import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Router } from '@angular/router';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { FCM } from '@ionic-native/fcm/ngx';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
 
  constructor(
    private platform: Platform,
    private backgroundMode: BackgroundMode,
    private statusBar: StatusBar,
    public ruter: Router,public fcm:FCM
    
    
  ) {
        this.initializeApp();
        this.onBackPressed();
        
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.backgroundMode.excludeFromTaskList ();
      this.fcm.getToken().then(token => {
        
          localStorage.setItem('idcellTwo',token)
      })      
            this.fcm.onNotification().subscribe(data =>{
              if(data.wasTapped){
        
              this.ruter.navigateByUrl('login');
            } else {
        
            };

          });
          this.fcm.onTokenRefresh().subscribe(token => {
            
               localStorage.setItem('idcellTwo',token)

        });
    
      }       
      )
 
  }

  onBackPressed(){
    this.ruter.navigateByUrl('login');
  }
}
