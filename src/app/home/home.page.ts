import { Component, OnInit } from '@angular/core';
import { chat, ChatsService } from '../servicios/chats.service';
import { ModalController } from '@ionic/angular';
import { VentanaChatComponent } from '../component/ventana-chat/ventana-chat.component';
import { ListUserComponent } from '../component/list-user/list-user.component';
import { ActivatedRoute } from '@angular/router';
import { LoginServices } from '../login/login-services/login-service.service';
import { AdminService } from '../servicios/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
   public cht : any = [];
  public idEmisor = null;
  public ver ;
  public w = 0;
  isItemAvailable = false;
  items = [];
  public user;
  public buscar ='';

  constructor(private chat : ChatsService, private http: LoginServices,public adminservice : AdminService,
    private modal : ModalController, public rutes : ActivatedRoute) {
     const usa: any = localStorage.getItem('usuario');
      this.idEmisor = usa.replace(/['"]+/g,'');
    this.isItemAvailable = false;
    this.adminservice.getchatprivate(this.idEmisor).subscribe(room =>{
      this.user = room;
    })
  }
  
  ngOnInit(){
   
 
    this.chat.getchatrooms().subscribe(chats => {
     this.items = [];
      Object.keys(chats).forEach((e) =>{
        if(this.user.status != "Sadmin"){
          if(chats[e].id_sender == this.idEmisor || chats[e].id_receiver == this.idEmisor ){
            this.items.push(chats[e])
           
          }}
          
      }) ; setTimeout(() => {
     
        this.ordenar();
      this.ver = true;
    }, 2500);
 
    });
   
   
  }
  ionViewDidLeave(){
    this.isItemAvailable = false
  }
  ordenar(){
    this.cht.sort(function(a, b) {
      if (a.date.seconds < b.date.seconds) {
        return 1;
      }
      if (a.date.seconds > b.date.seconds) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
  }
  openChat(chat){
    this.modal.create({
      component: VentanaChatComponent ,
      componentProps : {
        chats : chat,
        idenv : this.idEmisor
      }
    }).then((modal) => modal.present())
  }

  openList(){
    this.modal.create({
      component: ListUserComponent,
      componentProps : {
        idenv : this.idEmisor
      }
      
    }).then((modal) => modal.present())
  }
  chatDelete(id){
    let url = "https://evening-woodland-07547.herokuapp.com/api/v1/eraseAllMessages/"+id;
    let header = { user: localStorage.getItem("token")};
    this.http.deleteUser(url,header).subscribe(data =>{
      this.chat.deltechat(id);
    })
    
  }
  desencript(a){
    return atob(a)
  }
  conteos(a){
    let w = 0;
    for(let i=0;i<Object.keys(a.messages).length;i++){
   
      if( (a.messages[i].readed == false) && (a.messages[i].sender != this.idEmisor)){
      
        w++;
        
      }
      if( ((i+1) == Object.keys(a.messages).length) && (w != 0)){
        return w
      }
    }

  }
 // initialize the items with false

initializeItems(){ 
  if(this.isItemAvailable){
    this.isItemAvailable = false
  }else{
    this.isItemAvailable = true
  }
     this.cht = this.items.slice(); 
        
}

getItems(event: any) {
 
    const val = event.target.value.toLowerCase();
    const valTwo = event.target.value.toUpperCase();
   
    if (val && val.trim() != '') {
      this.items = [];
        for(let i = 0;i<Object.keys(this.cht).length;i++){
          if((this.cht[i].name_receiver.includes(`${val}`) || this.cht[i].name_receiver.includes(`${valTwo}`)) ||
          (this.cht[i].name_sender.includes(`${val}`) || this.cht[i].name_sender.includes(`${valTwo}`))){
            console.log('hola')
            this.items.push(this.cht[i]);
          }
        }      
 
    } else{
      this.items = this.cht.slice();
    }
  }  

}
