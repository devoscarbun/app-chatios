import { Component, OnInit, ViewChild } from '@angular/core';
import { NavParams, ModalController, IonContent } from '@ionic/angular';
import { messages } from '../../models/messaje';
import { ChatsService} from '../../servicios/chats.service';
import { NativeKeyboard } from '@ionic-native/native-keyboard/ngx';
import { AdminService } from 'src/app/servicios/admin.service';
import { Platform } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { Observable } from 'rxjs/internal/Observable';
import { AngularFireStorage } from '@angular/fire/storage';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { LoginServices } from 'src/app/login/login-services/login-service.service';

export interface MyData {
  name: string;
  filepath: string;
  size: number;
}

declare var $: any;
@Component({
  selector: 'app-ventana-chat',
  templateUrl: './ventana-chat.component.html',
  styleUrls: ['./ventana-chat.component.scss'],
})
export class VentanaChatComponent implements OnInit {
   
  public chat: any ;
  public url;
  public mensajes = [];
  public message : messages;
  public msg: string = "";
  public room: any = [];
  public idEmisor: string;
  public avatar: string; 
  public verChat;
  public user : string = "";
  public usuario : any = [];
  div: any;
  verTodo: boolean;
  public time;
  public verR=[];
  public cam;
  public images;
  public tipomsg = "text";
  datos;
  base64textString: string;
  files;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  cargarimg: boolean;
  public uploadImg;
  deletes;
  temp;
 IonContent: IonContent;
backbun;

  constructor(  private platform: Platform, public adminservice : AdminService,private keyboard: Keyboard,
    public keyboardas : NativeKeyboard,  private navparams : NavParams, private modal: ModalController,
     private chatservice : ChatsService, private camera: Camera,private base64: Base64,private webview: WebView, 
     private storage : AngularFireStorage, private http: LoginServices) { 
    this.keyboardas.hideMessengerKeyboard(); 

    this.user = localStorage.getItem('usuario').replace(/['"]+/g,'');
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
  }

  ngOnInit() {
this.chatservice.getchattime().subscribe(res =>{
  this.time = res;

}); 
     this.chat = this.navparams.get('chats');
     this.idEmisor = this.navparams.get('idenv');
    this.chatservice.getchatprivate(this.chat.id).subscribe(room =>{
      this.room = room;
      
     
      
    });
    this.adminservice.getchatprivate(this.user).subscribe(room =>{
      this.usuario = room;
    });  

      this.moverseA();
     this.backbun = this.platform.pause.subscribe(async () => {
      this.verChat = true;
    });
  }
  ionViewDidEnter(){
    this.backbun.unsubscribe();
  }
  verTecx(){
    this.keyboard.show();

  }
  moverseA() {   
    
  
    
      setTimeout(() => {
        $("#venchat").scrollTop(10000)
      }, 500);
     
    
}
enfoque(){
  document.getElementById("myInput").focus();

}
  close(){
    this.modal.dismiss()
  }
  sendMessage(){
  
   
    if(this.room){
      const text : messages = {
           content: this.encript(this.msg),
           date: new Date,
           type : this.tipomsg,
           sender: this.idEmisor,
           name_sender:  this.usuario.name,
           name_receiver:this.room.name,
           readed: false,
           notificated: false,
           notificated_attempts: 0,
           id: this.room.messages[Object.keys(this.room.messages).length-1].id +1
  
      }   
       if(this.msg != ""){
        let url = "https://evening-woodland-07547.herokuapp.com/api/v1/storeMessage";
        let header = { user: localStorage.getItem("token")};
       
        let env;
        if(this.chat.id_receiver == this.user){

           env = {
          id_chat:this.chat.id,
          id_message: this.room.messages[Object.keys(this.room.messages).length-1].id +1,
          id_sender:this.chat.id_receiver,
          id_destination:this.chat.id_sender,
          content:this.encript(this.msg),
          }
        }else{
           env = {
            id_chat:this.chat.id,
            id_message:this.room.messages[Object.keys(this.room.messages).length-1].id +1,
            id_sender:this.chat.id_sender,
            id_destination:this.chat.id_receiver,
            content:this.encript(this.msg)
            }
        }
   
        this.http.postimg(url,env,header).subscribe(data =>{

        })
        this.chatservice.sentMessage(text,this.chat.id);
        this.msg = ""; 
        this.enfoque();
        this.tipomsg = "text";
        let cam = null;
        localStorage.setItem('cam',cam);
        this.moverseA();
        }
    }else{
        const text : messages = {
          content: this.encript( this.msg),
          date: new Date,
          type : this.tipomsg,
          sender: this.idEmisor,
          name_sender:  this.usuario.name,
          name_receiver: this.room.name,
          readed: false,
          notificated_attempts:0,
          notificated: false,
          id:1 }
          if(this.msg != ""){
            let url = "https://evening-woodland-07547.herokuapp.com/api/v1/storeMessage";
        let header = { user: localStorage.getItem("token")};
       let env;
        if(this.chat.id_receiver == this.user){

           env = {
          id_chat:this.chat.id,
          id_message: 1,
          id_sender:this.chat.id_receiver,
          id_destination:  this.chat.id_sender,
          content: this.encript(this.msg)
          
          }
        }else{
           env = {
            id_chat:this.chat.id,
            id_message: 1,
            id_sender:this.chat.id_sender,
            id_destination:this.chat.id_receiver,
            content: this.encript(this.msg)

            }
        }
        
        this.http.postimg(url,env,header).subscribe(data =>{
            
        })
            this.chatservice.sentMessage(text,this.chat.id);
            this.msg = ""; 
            this.tipomsg = "text";
            let cam = null;
            localStorage.setItem('cam',cam);
            this.enfoque();
            this.moverseA();
     
      }}       
  }
  readMs(id){
    if(id.id > 0 ){
      const ids = id.id;
     
      let a = this.room.messages.slice(); 
      for(let i=0;i<Object.keys(a).length;i++){
         if ( a[i].id == ids ){
        
          a[i].readed = true; 
           this.chatservice.verms(this.chat.id,a);  
         this.verR[id]=""; 
          
          return 
        }
      }      
    }
  }

 
  delete(id){
    console.log(id);
 
    console.log(this.room)
    let url= 'https://evening-woodland-07547.herokuapp.com/api/v1/notifyReadedMessage';
    let header = { user: localStorage.getItem("token")};
    let env = {
        id_chat: this.chat.id,
        id_message: id.id,
        content: id.content,
        type: id.type
    } ;
    this.readMs(id);   
    this.http.postimg(url,env,header).subscribe(data => {
        this.deletes = data;
      if(this.deletes.status != "error")  {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
      } 
    })
   
  }
  convert(a){

    // Unixtimestamp
    let unixtimestamp = a;
   
    // Months array
    let months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
   
    // Convert timestamp to milliseconds
    let date = new Date(unixtimestamp*1000);
   
    // Year
    let year = date.getFullYear();
   
    // Month
    let month = months_arr[date.getMonth()];
   
    // Day
    let day = date.getDate();
   
    // Hours
    let hours = date.getHours();
   
    // Minutes
    let minutes = "0" + date.getMinutes();
   
    // Seconds
    let seconds = "0" + date.getSeconds();
   
    // Display date time in MM-dd-yyyy h:m:s format
    let convdataTime = month+'-'+day+'-'+year+' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    
    return convdataTime;   
   }
 
   addImg(){
    let cam = 'activo';
    localStorage.setItem('cam',cam);
    const options: CameraOptions = {
      quality: 15,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):age
     let base64Image = imageData;
     this.base64.encodeFile(base64Image).then((base64File: string) => {
    let url = "https://evening-woodland-07547.herokuapp.com/api/v1/saveFile";
    let header = { user: localStorage.getItem("token")};
    let env = {
      type: "image",
      location: 'chat',
      doc :base64File
    };
      this.http.postimg(url,env,header).subscribe(data =>{
        this.uploadImg = data;
        if(this.uploadImg.status != 'error'){
          this.tipomsg = "img";
          this.msg = 'http://secretchatapi.bunkerdevelopers.com'+this.uploadImg.message;
          this.sendMessage();
         
        }else{
          alert("No Se Pudo Cargar la Imagen")
        }     
      },err =>{
        alert("Error al cargar la imagen")
      })  
    }, (err) => {
      console.log(err);
    });
   
    }, (err) => {
     // Handle error
    });
  
   }
   verImg(){
     this.cargarimg = !this.cargarimg;
   }
   encript(a){
    return a
     
     
   }
   desencript(a){
    
    if (a.slice(-1) === '='){
    return atob(a);
    }else{
      return a;
   
   }
}}
