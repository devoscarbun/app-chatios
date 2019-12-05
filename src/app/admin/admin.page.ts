import { Component, OnInit } from '@angular/core';
import { user, AdminService } from '../servicios/admin.service';
import { ModalController } from '@ionic/angular';
import { RegisterComponent } from '../component/register/register.component';
import { ChatsService } from '../servicios/chats.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-admin',
  templateUrl: 'admin.page.html',
  styleUrls: ['admin.page.scss'],
})
export class AdminPage implements OnInit {
   public user = [];
   public users;
   public ver;
   public time;
   public tiempo: string =" " ;
   public room;
   public acount;
   public idEmisor;
  isItemAvailable: boolean;
  items: any[];
  constructor(private admin : AdminService, private modal : ModalController,
     private chatservice : ChatsService, public toastController: ToastController ) {
      this.users = localStorage.getItem('usuario').replace(/['"]+/g,'');
      this.admin.getchatprivate(this.users).subscribe(room =>{
        this.room = room;
         this.acount = this.room.creator.replace(/['"]+/g,''); });
         const usa: any = localStorage.getItem('usuario');
         this.idEmisor = usa.replace(/['"]+/g,'');
    
         this.isItemAvailable = false;
     }
  
  ngOnInit(){
    this.isItemAvailable = false;
    this.chatservice.getchattime().subscribe(res =>{
      this.time = res;
     
      let b = this.time.time/1000;
      this.tiempo = b.toString();
    });
    this.admin.getchatrooms().subscribe(user =>{
      this.user =[];
      Object.keys(user).forEach((e)=>{
        
          if(user[e].creator.replace(/['"]+/g,'') == this.idEmisor){
            this.user.push(user[e])
          }
      
      })

      setTimeout(() => {
        this.ver = true;
      }, 2500);
    })


  }
  ionViewDidLeave(){
    this.isItemAvailable = false
  }
  async presentToast() {
    const toast = await this.toastController.create({
     
      position: 'top',
      message: 'Ajuste Exitoso',
      duration: 2000
    });
    toast.present();
  }
  openRegister(user){
    this.modal.create({
      component:  RegisterComponent,
      componentProps : {
        user : user
      }
    }).then((modal) => modal.present())
  }
  openRegisterNew(){
    this.modal.create({
      component:  RegisterComponent,
     
    }).then((modal) => modal.present())
  }
  deleteTime(){
    let tim = parseInt(this.tiempo)*1000;
    this.admin.deleteTime(tim);
    this.presentToast();

  }
  initializeItems(){ 
    if(this.isItemAvailable){
      this.isItemAvailable = false
    }else{
      this.isItemAvailable = true
    }
       this.items = this.user.slice(); 
      
       
  }
  
  getItems(ev: any) {
    
      //const val = btoa(ev.target.value);
      const val = ev.target.value.toLowerCase();
      const valTwo = ev.target.value.toUpperCase();
    console.log(val)
      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.user = [];
          for(let i =0;i<Object.keys(this.items).length;i++){
            if(this.items[i].name.includes(`${val}`) || this.items[i].name.includes(`${valTwo}`)){
              console.log('hola')
              this.user.push(this.items[i]);
            }
          }      
   
      } else{
        this.user = this.items.slice();
      }
    }

}
