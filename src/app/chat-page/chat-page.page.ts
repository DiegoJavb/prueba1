import { Router } from '@angular/router';
import { ChatService, Message } from './../services/chat.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { IonContent } from '@ionic/angular';
import { ThisReceiver } from '@angular/compiler';


@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.page.html',
  styleUrls: ['./chat-page.page.scss'],
})
export class ChatPagePage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  messages:Observable<Message[]>;
  newMsg='';
  constructor(
    private chatService: ChatService,
    private router:Router
  ) { }

  ngOnInit() {
    this.messages = this.chatService.getChatMessages();
  }

  setMessage(){
    this.chatService.addChatMessage(this.newMsg).then(()=>{
      this.newMsg='';
      this.content.scrollToBottom();
    })
  }

  signOut(){
    this.chatService.signOut().then(()=>{
      this.router.navigateByUrl('/',{replaceUrl:true})
    })
  }

}
