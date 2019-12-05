import { Component, OnInit, DoCheck, AfterViewInit,OnDestroy, AfterViewChecked } from '@angular/core';
import { AdminService } from 'src/app/servicios/admin.service';
import { LoginServices } from 'src/app/login/login-services/login-service.service';
import { Router } from '@angular/router';
import { Platform, ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.scss'],
})
export class InitComponent implements OnInit  {

public user;
public room;
public avatar;
public status;
public status2;
camActivity: any;
private sub1$:any;
private sub2$:any;



constructor(public adminservice : AdminService,public ruter: Router,private modal: ModalController,
    public http: LoginServices,private platform: Platform, private camera: Camera,private backgroundMode: BackgroundMode,
    ) {
      
      this.user = localStorage.getItem('usuario').replace(/['"]+/g,''); }

  ngOnInit() {this.iniciar()
    
  this.sub1$=this.platform.pause.subscribe(() => {  
    let cam = localStorage.getItem('cam');
    if(cam == 'activo'  ){
      
      
    }else{
     
     this.cancel();  
   }      
     });  

   this.sub2$= this.platform.resume.subscribe(async () => {
    let cam = localStorage.getItem('cam');
    if(cam == 'activo'  ){
      
      
    }else{
      
        this.cancel()                                                                    
     
    }
  });

   }                                                            

   ionViewWillLeave(){
    this.sub1$.unsubscribe();
    this.sub2$.unsubscribe();
  }
  ionViewWillUnload() {
    
    this.sub1$.unsubscribe();
    this.sub2$.unsubscribe();
  }
  cancel(){
   
    this.ruter.navigateByUrl('login') 
    this.modal.dismiss();
    setTimeout(() => {
     
        navigator['app'].exitApp(); 
    }, 200);
  
  }  

  iniciar(){    
      this.adminservice.getchatprivate(this.user).subscribe(data =>{
        this.room = data;
        if(this.room){
          this.avatar = this.room.avatar;
        }
        if (this.room.status == "admin"){
          this.status = this.room.status;
         
        }
        if (this.room.status == "Sadmin"){
          this.status2 = this.room.status;
         
        }
      })
  }
  salir(){
  
    this.http.logout();
  }
  ir(a){
    this.ruter.navigate(['ini',a]);
  }
  outSesion(){
    let env  = {
      id: localStorage.getItem('usuario'),
      reg_token: localStorage.getItem('idcell')                                                                                                                                                                      
    }
    let header ={
     
      user: localStorage.getItem('token')
    }
    let url= 'https://evening-woodland-07547.herokuapp.com/api/v1/logout';
    this.http.postimg(url,env,header).subscribe(data =>{
      let das : any = data;
     
      if(das.status != "error" ){
    
         setTimeout(() =>  {
          
          
           this.ruter.navigate(['login']);
  
         }, 200);
  
      }
  
  })
  }

}
