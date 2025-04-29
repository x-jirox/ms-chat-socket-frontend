import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { ChatMessage } from '../models/chat-message';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private stompClient: any
  private messageSubject: BehaviorSubject<ChatMessage[]> = new BehaviorSubject<ChatMessage[]>([]);

  constructor() {
    this.initConnectionSocket();
  }

  initConnectionSocket() {
    const url = '//localhost:8080/chat-socket';
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
  }

  joinRoom(Id: string) {
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(`/topic/${Id}`, (message: any) => {
        const messageContent = JSON.parse(message.body);
        const currentMessages = this.messageSubject.getValue();
        currentMessages.push(messageContent);
        this.messageSubject.next(currentMessages);
      });
    })
  }

  sendMessage(Id: string, chatMessage: ChatMessage) {
    this.stompClient.send(`/app/chat/${Id}`, {}, JSON.stringify(chatMessage));
  }

  getMessagesSubject() {
    return this.messageSubject.asObservable();
  }

}
