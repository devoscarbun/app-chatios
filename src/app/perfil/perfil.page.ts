import { Component, OnInit } from '@angular/core';
import { AdminService } from '../servicios/admin.service';
import { ChatsService } from '../servicios/chats.service';
import { cuerpo } from '../models/messaje';
import { LoginServices } from '../login/login-services/login-service.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
@Component({
  selector: 'app-perfil',
  templateUrl: 'perfil.page.html',
  styleUrls: ['perfil.page.scss']
})
export class PerfilPage implements OnInit {
  public user: string = "";
  public acount : string = ""; 
  public avatar : string = "";
  public email : string = "";
  public lastname : string = "";
  public phone : string = "";
  public name : string = "";
  public status : string = "";
  public userId : string = "";
  room :any;
  public cuerpo : cuerpo;
  public ver;
  public res;
  verteclado: boolean;
  public uploadImg;
  msg: any;
  tipomsg: string;
  idChats: any;
  constructor( private camera: Camera,private base64: Base64,private http: LoginServices,public chat: ChatsService,public adminservice : AdminService) {
    this.user = localStorage.getItem('usuario').replace(/['"]+/g,'');
  
  }

  ngOnInit() {
    this.adminservice.getchatprivate(this.user).subscribe(room =>{
      this.room = room;
    
      this.acount = this.room.account;
      this.name = this.room.name;
      this.phone = this.room.phone;
      this.status = this.room.status;
      this.userId = this.room.userId;
      this.lastname = this.room.lastname;
      this.avatar = this.room.avatar;
      this.email = this.room.email;
      this.idChats = this.room.idChats
      setTimeout(() => {
        this.ver = true;
      }, 2500);
    });
 
  }
  actualizar(){ 
     this.ver = false;
    let header = { user: localStorage.getItem("token")}
    let url = 'https://evening-woodland-07547.herokuapp.com/api/v1/updateUser/'+this.user;
    let env = { account: this.acount}
    setTimeout(() => {
       this.http.modificated(url,env,header).subscribe(data =>{
        this.res = data
        if(this.res.status != "error"){

      
    this.cuerpo = {
      account: this.acount,
      name: this.name,
      lastname: this.lastname,
      phone: this.phone,
      status: this.status,
      userId: this.userId,
      avatar: this.avatar,
      email:  this.email,
  

    }
    this.adminservice.updatePerfil(this.cuerpo, this.userId);
    setTimeout(() => {
      let cam = null;
      localStorage.setItem('cam',cam);
      this.ver = true;
    }, 2500);  }else{
      alert(this.res.message);
    }
    })
    }, 400);
  
  }

    addImg(){
      let cam = 'activo';
      localStorage.setItem('cam',cam);
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }
      
      this.camera.getPicture(options).then((imageData) => {
       // imageData is either a base64 encoded string or a file URI
       // If it's base64 (DATA_URL):
       let base64Image = imageData;
       this.base64.encodeFile(base64Image).then((base64File: string) => {
      let url = "https://evening-woodland-07547.herokuapp.com/api/v1/saveFile";
      let header = { user: localStorage.getItem("token")};
      let env = {
        type: "image",
        location: 'profile',
        doc : base64File
      };
        this.http.postimg(url,env,header).subscribe(data =>{
          this.uploadImg = data;
          if(this.uploadImg.status != 'error'){
            this.tipomsg = "img";
            this.avatar = 'http://secretchatapi.bunkerdevelopers.com'+this.uploadImg.message;
            this.actualizar();
           
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
  

  setResult (value) {
    document.getElementById("result").innerHTML = value;
    this.acount = value;
}
  getResult() {
    return(document.getElementById("result").innerHTML);
}
  add(key) {
    var result = this.getResult();
    if (result!="0" || isNaN(key)) this.setResult(result + key);
    else this.setResult(key);
}
del() {
  this.setResult(0);
  
}
sumar19(){
  this.acount = this.acount.slice(0,-1);
  this.setResult (this.acount);
  } 
   
  
}
