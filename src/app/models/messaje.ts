

export interface messages {

    content: any,
    date: Date,
    type : string,
    sender: string,
    name_sender: string,
    name_receiver: string,
    id: number,
    readed: boolean,
    notificated: boolean,
    notificated_attempts: number
  

}
 export interface cuerpo {
    account: string,
    avatar: string,
    email: string,
    lastname: string,
    name: string,
    status: string,
    userId: string,
    phone: string,  
   
 }