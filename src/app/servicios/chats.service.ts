import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { messages } from '../models/messaje';
import { firestore } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment.prod';

export interface chat {
  descricion : string,
  name : string,
  id: string,
  img : string,
  message: string
} ;
export interface userlist {
  idColections: "",
  name: "",
  avatar : "",
  status : "",
  lastname: ""

}
export interface nota {
  content: string,
  date :string,
  iduser: string,
  title: string,
  id: string
}
export interface time {
 
  time: number,
 

}
@Injectable({
  providedIn: 'root'
})
export class ChatsService {


  constructor(private AFauth :AngularFireAuth, private db : AngularFirestore) {
   }
   getchatrooms(){
     return this.db.collection('chatrooms').snapshotChanges().pipe(map(rooms =>rooms.map(a => {
       let data = a.payload.doc.data() as chat;
       data.id = a.payload.doc.id;
       
       return data;
     })))
   }
   getchatuser(){
    return this.db.collection('users').snapshotChanges().pipe(map(rooms =>rooms.map(a => {
      const data = a.payload.doc.data() as userlist;
      return data;
    })))
  }
  getchattime(){
    return this.db.collection('config').doc('delete_parameters').valueChanges();
  
  }
   getchatprivate(chat_id : string ){
     return this.db.collection('chatrooms').doc(chat_id).valueChanges();
   }
   addNewUser(email,password ){
     return new Promise ((resolve, reject)=> {
       this.AFauth.auth.createUserWithEmailAndPassword(email,password).then(res =>{

       }).catch( err => reject(err))
     } )
      
   }
   sentMessage(text: messages, chat_id : string){
      this.db.collection('chatrooms').doc(chat_id).update({
        messages : firestore.FieldValue.arrayUnion(text),
        date: new Date,
       
      })
   }
   sentchat(text: messages, chat_id : string, img : string, name : string,description: string,idEmisor:string,idReceptor:string,nameEmisor: string, nameReceptor : string,id:number){
    this.db.collection('chatrooms').doc(chat_id).set({
      messages : firestore.FieldValue.arrayUnion(text),
      img : img,
      name: name,
      description: name+" "+description,
      id_sender: idEmisor,
      id_receiver: idReceptor,
      name_sender: nameEmisor,
      name_receiver: nameReceptor,
      id: id,
     
      date: new Date
      
    })
 }
 deletedMessage(id: string, text: any ){
   this.db.collection('chatrooms').doc(id).update({
    messages :text
   })
 }
 verms(id: string, text: any ){
 
    this.db.collection('chatrooms').doc(id).update({
     messages : text
    })
  
 }
 getNotas(){
  return this.db.collection('library').snapshotChanges().pipe(map(rooms =>rooms.map(a => {
    let data = a.payload.doc.data() as nota;
      data.id = a.payload.doc.id;  
    return data;
  })))

 }
 getNotaIndividual(chat_id : string ){
  return this.db.collection('library').doc(chat_id).valueChanges();
}
delteNota(id: string){
   this.db.collection('library').doc(id).delete()
}
deltechat(id: string){
  this.db.collection('chatrooms').doc(id).delete()
}
addNota(env: any){
  this.db.collection('library').add({
    content: env.content,
    title: env.title,
    idUser:env.idUser,
     date: new Date,

  })    

}
  modificateNote(env:any,idNota : any){
    this.db.collection('library').doc(idNota).update({
      content:env.content,
      title: env.title,
      iduser: env.idUser,
      date: new Date
    })
  }
}
