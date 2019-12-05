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
export class ListUserSAComponent implements OnInit {
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
   
  }
  
  ngOnInit(){
    this.idEmisor = this.navparams.get('idenv');
    this.chats = this.navparams.get('user');
    this.adminservice.getchatprivate(this.chats.userId).subscribe(room =>{
      this.room = room;
     
    this.acount = this.room.creator.replace(/['"]+/g,''); 
      
    this.chat.getchatuser().subscribe(chats =>{  
      this.chta = chats; 

  
          })
    }) 
  
  }

  add(a){ 
    this.room.idChats.push(a.userId);
    this.adminservice.UpdateUserChats(this.room.idChats,this.room.userId);
    a.idChats.push(this.room.userId);
    this.adminservice.UpdateUserChats(a.idChats,a.userId);

  }
 remove(a){
    for(let i=0;i<Object.keys(this.room.idChats).length;i++){
      if(this.room.idChats[i] == a.userId){
        this.room.idChats.splice(i,1)
       this.adminservice.UpdateUserChats(this.room.idChats,this.room.userId);
      }
    }
    for(let j=0; j<Object.keys(a.idChats).length; j++){
      if( a.idChats[j] == this.room.userId){
        a.idChats.splice(j,1)
        this.adminservice.UpdateUserChats(a.idChats, a.userId);
      }
    }
 }
 
  close(){
    this.modal.dismiss()
  } 
  shared(a){

   
      if(this.room.userId == a){
        return -1;
      }else{
        for(let i=0; i< Object.keys(this.room.idChats).length;i++){
          if(this.room.idChats[i].replace(/['"]+/g,'') == a){
        return -1;
      }
      }
    
    }
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
