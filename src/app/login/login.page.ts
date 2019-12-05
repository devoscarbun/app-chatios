import { Component } from '@angular/core';
import { LoginServices} from './login-services/login-service.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
    env: any;
    public email;
    public password; 
    valor = "";
    public das;
    public ver: any;
    public token;
   

  constructor(private http: LoginServices,public ruter: Router,
  private AFauth :AngularFireAuth) {
     let cam = null;
        localStorage.setItem('cam',cam);
     }
  
  setResult (value) {
    document.getElementById("result").innerHTML = value;
    this.valor = value;
}
  getResult() {
    return(document.getElementById("result").innerHTML);
}
  add(key) {
    var result = this.getResult();
    if (result!="0" || isNaN(key)) this.setResult(result + key);
    else this.setResult(key);
}
  calc() {
    var value = this.getResult();  
    var result = eval(this.getResult());
    this.setResult(result);
    this.setResultTwo(value);
}
  del() {
    this.setResult(0);
    this.setResultTwo(0);
}

  sumar19(){
    this.valor = this.valor.slice(0,-1);
    this.setResult (this.valor);
    } 
  sumar15(){
    this.email = this.valor+"@"+"secretchat.com";
    this.password = this.valor;
    this.http.login(this.email,this.password).then( res => {  this.ver = res;
      this.AFauth.idToken.subscribe(user => {
        let res = user;
       const id = this.ver.user.uid ;
        localStorage.setItem("usuario", JSON.stringify(id));
        
        this.env ={
        id: id,
        token: localStorage.getItem('idcellTwo').replace(/['"]+/g, '')
      };  
     
            
             // localStorage.setItem('idcellTwo', JSON.stringify(this.env.token));
              let url= 'https://evening-woodland-07547.herokuapp.com/api/v1/login';
              this.http.postdelete(url,this.env).subscribe(data =>{
                this.das = data;
               
                if(this.das.status != "error" ){
                  localStorage.setItem("token",this.das.message)
             
              
                   setTimeout(() =>  {
                   this.del();
                     this.ruter.navigate(['/ini','home']);
         }, 200);
          
             }
          
            })  
               

    });
     
    }).catch(err => this.valor= this.valor+"!"); 
  
  }
  setResultTwo (value) {
    document.getElementById("resulttwo").innerHTML = value;
    this.valor = value;
  }


}