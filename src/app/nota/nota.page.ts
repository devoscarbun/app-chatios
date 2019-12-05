import { Component, OnInit } from '@angular/core';
import { chat, ChatsService } from '../servicios/chats.service';
import { ModalController } from '@ionic/angular';
import { AddNotaComponent } from '../component/add-nota/add-nota.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nota',
  templateUrl: 'nota.page.html',
  styleUrls: ['nota.page.scss'],
})
export class NotaPage implements OnInit {
   public cht : any = [];
  public idEmisor ;
  public ver ;
  constructor(private chat : ChatsService, private modal : ModalController, public rutes : ActivatedRoute) {
     const usa: any = localStorage.getItem('usuario');
      this.idEmisor = usa.replace(/['"]+/g,'');

  }
  
  ngOnInit(){
  
    this.chat.getNotas().subscribe(chats => {
      this.cht = [];
      Object.keys(chats).forEach((e) =>{
        
          if(chats[e].idUser == this.idEmisor ){
            this.cht.push(chats[e])
           
          }
      }) ; setTimeout(() => {
     
        this.ordenar();
      this.ver = true;
    }, 2500);
 
    });
   
   
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
      component: AddNotaComponent ,
      componentProps : {
        chats : chat,
        idenv : this.idEmisor
      }
    }).then((modal) => modal.present())
  }
  openList(){
    this.modal.create({
      component: AddNotaComponent ,
    
    }).then((modal) => modal.present())
  }


}
