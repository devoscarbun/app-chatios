import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController } from '@ionic/angular';
import { AdminService } from 'src/app/servicios/admin.service';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { NativeKeyboard } from '@ionic-native/native-keyboard/ngx';
import { ChatsService } from 'src/app/servicios/chats.service';

declare var $: any;
@Component({
  selector: 'app-add-nota',
  templateUrl: './add-nota.component.html',
  styleUrls: ['./add-nota.component.scss'],
})
export class AddNotaComponent implements OnInit {
  public chat;
  public idEmisor;
  public room;
  public user;
  public nota;
  public title;
  public ver;

  constructor(private navCtrl: NavController, public adminservice : AdminService,private keyboard: Keyboard,
    public keyboardas : NativeKeyboard,  private navparams : NavParams, private modal: ModalController,
     private chatservice : ChatsService) { 
    this.keyboardas.hideMessengerKeyboard(); 
    const usa: any = localStorage.getItem('usuario');
      this.idEmisor = usa.replace(/['"]+/g,'');
      console.log(this.idEmisor);
  }


   

  ngOnInit() {
    this.chat = this.navparams.get('chats');
    console.log(this.chat);
    if(this.chat){
      this.ver = true
    }else{
      this.ver = false
    }
  }

  close(){
    this.modal.dismiss()
  }
  delete(id){

    this.chatservice.delteNota(id);
    this.close();
  }
  modificateView(){
      this.ver = false;
      this.title = this.chat.title;
      this.nota = this.chat.content;
  }
  sentModificate(){
    let env = {
      content: this.nota,
      title: this.title,
      idUser: this.idEmisor
    };
    this.chatservice.modificateNote(env,this.chat.id);
    this.close();
  } 
  guardar(){
    let env = {
      content: this.nota,
      title: this.title,
      idUser: this.idEmisor
    };
    this.chatservice.addNota(env);
    this.close();
  }
  next(){
    
      document.getElementById("myArea").focus();
      this.close();
     
    
  }

}
