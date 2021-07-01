//import { Message } from './chat.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {switchMap,map} from 'rxjs/operators';

export interface User{
  uid:string;
  email:string;
}

export interface Message{
  createAt:Date;
  id:string;
  from:string;
  msg:string;
  fromName:string;
  myMsg:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
currrentUser:User=null;
  constructor (
    private ofAuth: AngularFireAuth,
    private afs:AngularFirestore 
  ) {
    this.ofAuth.onAuthStateChanged(user=>{
      console.log('Changed: ',user);
      this.currrentUser=user;
    })
   }

  async singUp({email,password}){
    const credential = await this.ofAuth.createUserWithEmailAndPassword(
      email,
      password,
    );
    console.log('result: ', credential);
    const uid = credential.user.uid;
    
    return this.afs.doc(
      `users/${uid}`
    ).set({
      uid,
      email: credential.user.email,
    });
  }

    signIn({email,password}){
     return this.ofAuth.signInWithEmailAndPassword(email,password);
    }

    signOut(){
     return this.ofAuth.signOut();
    }

    addChatMessage(msg){
      return this.afs.collection('messages').add({
        msg,
        from: this.currrentUser.uid,
      });
    }
  
  getChatMessages(){
    let users=[];
    return this.getUser().pipe(
      switchMap(res=>{
        users=res;
        console.log('all users',users)
        return this.afs.collection('messages',ref=>ref.orderBy('createdAt')).valueChanges({idField:'id'}) as Observable<Message[]>
      }),
      map(messages=>{
        for (let m of messages){
          m.fromName = this.getUserForMsg(m.from, users);
          m.myMsg = this.currrentUser.uid === m.from;
        }
        console.log('all messages', messages)
        return messages;
      })
    )
  }

  getUser(){
    return this.afs.collection('users').valueChanges({idField:'uid'}) as Observable<User[]>;
  }
  getUserForMsg(msgFromId, users:User[]):string {
    for(let usr of users){
      if(usr.uid == msgFromId)return usr.email;
    }
    return 'Deleted';
  }
}
