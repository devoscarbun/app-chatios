import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, ToastController } from '@ionic/angular';
import {AdminService } from '../../servicios/admin.service';
import { cuerpo } from '../../models/messaje';
import { LoginServices }  from '../../login/login-services/login-service.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public user: any;
  public status : string = "";
  public acount ;
  public name : string = "";
  public lastname : string = "";
  public email: string = "";
  public phone : string = ""; 
  public avatar : string = "";
  public cuerpo : cuerpo;
  public idChats = [];
  public creator;

  users: any;
  public idemisor;
  public token;
  public res;
  public rem;
  respuestas;
  public verteclado;
  constructor( private navparams : NavParams, private modal: ModalController,public toastController: ToastController,
     private adminservice : AdminService, private http: LoginServices ) { 
      this.token = localStorage.getItem('token');
      console.log(this.token)
     }

  ngOnInit() {
    this.idemisor = localStorage.getItem("usuario");
    this.adminservice.getchatprivate(this.idemisor.replace(/['"]+/g,'')).subscribe(rem =>{
      this.rem = rem
    })
    this.user = this.navparams.get('user');
    this.adminservice.getchatprivate(this.user.idColection).subscribe(room =>{
     this.users = room;
    
        this.avatar = this.users.avatar;
        this.status = this.users.status;
        this.acount = this.users.account;
        this.creator = this.users.creator;
        this.name = this.users.name;
        this.lastname = this.users.lastname;
        this.email = this.users.email;
        this.phone = this.users.phone;  
        this.idChats = this.user.idChats;
    
    });
  
   
  }
  close(){
    this.modal.dismiss()
  }
  regiterUser(){
    let env = {
      creator: this.idemisor,
      name: this.name,
      status: this.status,
      acount: this.acount+"@secretchat.com",
      avatar: this.avatar,
      phone: this.phone,
      lastname: this.lastname,
     
      email: this.email,
      password: this.acount.toString()
    };
    console.log(env)
    let chass = [this.idemisor.replace(/['"]+/g,'')];
    console.log(chass)
    this.adminservice.addNewUser(env).then( res => {
     let iduser: any = res;
      if(res){
        
       this.rem.idChats.push(iduser.user.uid)
       this.adminservice.UpdateUserChats(this.rem.idChats,this.rem.userId);
      this.presentToast()
     }
    
    }).catch(error => console.log(error));
    
  }
  delete(){
    let url = 'https://evening-woodland-07547.herokuapp.com/api/v1/deleteUser/'+this.user.idColection;
    let header = { user:this.token };
    let ures = 'https://evening-woodland-07547.herokuapp.com/api/v1/eraseChatsUserDeleted/'+this.user.idColection;
   
      this.http.deleteUser(url,header).subscribe(data =>{
          this.respuestas = data;
          if(this.respuestas.status != "error"){
           this.http.deleteUser(ures,header).subscribe(datas => {
              this.adminservice.getchatrooms().subscribe(res =>{
                Object.keys(res).forEach((e)=>{
                  Object.keys(res[e].idChats).forEach((i)=>{
                    if(res[e].idChats[i] == this.user.idColection){
                      res[e].idChats.splice(i,1);
                      this.adminservice.UpdateUserChats(res[e].idChats,res[e].userId);
                    }
                  })
                })
              })
              this.close();
            })
          }

    })
  
  
  }
  actualizar(){
    let header = { user: localStorage.getItem("token")}
    let url = 'https://evening-woodland-07547.herokuapp.com/api/v1/updateUser/'+this.user.idColection;
    let env = { account: this.acount.toString()}
  
       this.http.modificated(url,env,header).subscribe(data =>{
        this.res = data;
       if(this.res.status != "error"){
        if(this.user){
          this.cuerpo = {
          account: this.acount,
          name: this.name,
          lastname: this.lastname,
          phone: this.phone,
          status: this.status,
          userId: this.user.idColection,
          avatar: this.avatar,
          email:  this.email,
          
          
    
        }
        this.adminservice.updatePerfil(this.cuerpo,this.user.idColection);
        this.close();
        }else{
    
    
            this.cuerpo = {
            account: this.acount,
            name: this.name,
            lastname: this.lastname,
            phone: this.phone,
            status: this.status,
            userId: this.user.idColection,
            avatar: this.avatar,
            email:  this.email,
            

          }
          this.adminservice.updatePerfil(this.cuerpo,this.user.idColection);
          this.close();
        
        
      }
       }else{
         alert(this.res.message)
       }
      
    })
    
   
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
  async presentToast() {
    const toast = await this.toastController.create({
     
      position: 'top',
      message: 'Usuario Creado',
      duration: 2000
    });
    toast.present();
  }
 
  
}
