import { Component, OnInit } from '@angular/core';
import { userlist, ChatsService } from '../../servicios/chats.service';
import { NavParams, ModalController } from '@ionic/angular';
import { messages } from '../../models/messaje';
import { AngularFirestore } from '@angular/fire/firestore';
import { AdminService } from 'src/app/servicios/admin.service';
 

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent implements OnInit {
  public chta = [];
  public env;
  public idEmisor; 
  public chats;
  public user : string = "";
  public room : any = [];
  public rooms;
  public acount = null;
  isItemAvailable: boolean;
  items: any[];
  constructor(public adminservice : AdminService, private navparams : NavParams,private chat : ChatsService, private modal : ModalController, private db : AngularFirestore ) {
    this.user = localStorage.getItem('usuario').replace(/['"]+/g,'');
    this.adminservice.getchatprivate(this.user).subscribe(room =>{
      this.room = room;
     
       this.acount = this.room.creator.replace(/['"]+/g,''); });
  }
  
  ngOnInit(){
    //this.chats = this.navparams.get('chats');
    this.idEmisor = this.navparams.get('idenv');
    this.chat.getchatuser().subscribe(chats =>{   
      this.chta = [];  
      Object.keys(chats).forEach((e)=>{
        if(this.room.status != "Sadmin"){
        if(chats[e].userId != this.user){
          Object.keys(chats[e].idChats).forEach((i) =>{
            if(chats[e].idChats[i].replace(/['"]+/g,'') == this.user){
              this.chta.push(chats[e]);
            }
          })
        }  }
      })
    });  
  
  }
  openChat(a){
    const text : messages = {
      content: btoa("Nuevo canal Privado") ,
      date: new Date,
      sender: "sin emisor",
      type : "text",
      name_sender: this.room.name ,
      name_receiver: a.name,
      id: 0 ,
      readed: true,
      notificated_attempts: 0,
      notificated: true
 }
 
  this.chat.sentchat(text,a.userId,a.avatar,a.name,a.lastname,this.idEmisor,a.userId,this.room.name,a.name,1);
    this.modal.dismiss();   
  }
  close(){
    this.modal.dismiss()
  } 
  initializeItems(){ 
    if(this.isItemAvailable){
      this.isItemAvailable = false
    }else{
      this.isItemAvailable = true
    }
       this.items = this.chta.slice(); 
      
       
  }
  
  getItems(ev: any) {
    
      //const val = btoa(ev.target.value);
      const val = ev.target.value.toLowerCase();  
      const valTwo = ev.target.value.toUpperCase();
      console.log(val);
  
  
      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.chta = [];
          for(let i =0;i<Object.keys(this.items).length;i++){
            if(this.items[i].name.includes(`${val}`) || this.items[i].name.includes(`${valTwo}`)){
              console.log('hola')
              this.chta.push(this.items[i]);
            }
          }      
   
      } else{
        this.chta = this.items.slice();
      }
    }


}
