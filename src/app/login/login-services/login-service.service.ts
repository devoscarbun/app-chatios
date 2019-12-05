import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginServices {
  resp: any;

  constructor( private AFauth :AngularFireAuth, private route: Router, private http: HttpClient) { }
    
    
    login(email:string, password: string){
      return new Promise((resolve,reject) => {
        this.AFauth.auth.signInWithEmailAndPassword(email,password).then(res =>{
           
          resolve(res)
        }).catch(err => reject(err));     
      }) 
    };
    logout(){
      this.AFauth.auth.signOut().then( auth =>{
         this.route.navigate(['/login']);
      });
     
    }
    
    seguridad(){
      this.AFauth.idToken.subscribe(user => {
        let res = user;
        console.log(res);
        return res;
       
    });
      
    }
     postdelete(url,env){
    
     return this.http.post(url,env);

  }
  postimg(url,env,header){
    
    return this.http.post(url,env,{headers:header});

 }
    modificated(url,env,header){
      return this.http.put(url,env,{headers: header})
    }
    deleteUser(url,header){
      return this.http.delete(url,{headers: header})
    }
   
}
