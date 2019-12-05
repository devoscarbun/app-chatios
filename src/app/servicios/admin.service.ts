import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';

import { map, timeInterval } from 'rxjs/operators';
import { messages, cuerpo } from '../models/messaje';
import { firestore } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

export interface user {
  name : string,
  email : string,
  id: string,
  img : string,
  telephone: string,
  status: string,
  account : string,
  lastname : string,
  idColection : string
} 

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  
  constructor(private AFauth :AngularFireAuth, private db : AngularFirestore) {
  }
  getchatrooms(){
    return this.db.collection('users').snapshotChanges().pipe(map(rooms =>rooms.map(a => {
      const data = a.payload.doc.data() as user;
      data.idColection = a.payload.doc.id;
      
      return data;
    })))
  }
  getchatprivate(chat_id : any ){
    return this.db.collection('users').doc(chat_id).valueChanges();
  };
  getUserprivate(id: string){
    this.db.collection('users').doc(id).valueChanges();
  }
  addNewUser(env : any ){
  
    return new Promise ((resolve, reject)=> {
      this.AFauth.auth.createUserWithEmailAndPassword(env.acount,env.password).then(res =>{
       
      const id = res.user.uid;
        this.db.collection('users').doc(id).set({
          name: env.name,
          status: env.status,
          account: env.password,
          avatar: "https://firebasestorage.googleapis.com/v0/b/chatsecreto-deda5.appspot.com/o/user.jpeg?alt=media&token=e9bf20b4-b6f4-4260-81a5-805f552ad784",
          phone: env.phone,
          lastname: env.lastname,
          email: env.email ,
          userId : id,
          creator:env.creator,
          idChats: [env.creator]
        })
        resolve(res)
        console.log(res)
      }).catch( err => reject(err))
    } )
     
  }
  sentMessage(text: messages, chat_id : string){
     this.db.collection('users').doc(chat_id).update({
       messages : firestore.FieldValue.arrayUnion(text)
     })
  }
  updatePerfil(cuerpo : cuerpo,chat_id: string){
    this.db.collection('users').doc(chat_id).update({
       account: cuerpo.account,
       avatar: cuerpo.avatar,
       email: cuerpo.email,
       lastname: cuerpo.lastname,
       name: cuerpo.name,
       status: cuerpo.status,
       userId: cuerpo.userId,
       phone: cuerpo.phone,
    })
  }
  UpdateUserChats(env,userId){
    this.db.collection('users').doc(userId).update({
      idChats : env
    })
  }
  deleteUser(id: string){
    this.db.collection('users').doc(id).delete();
  }
  deleteTime(time:number){
    this.db.collection('config').doc('delete_parameters').update({
      time: time
    })
  }
  
 
}
