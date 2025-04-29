import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatMessage } from 'src/app/models/chat-message';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent  implements OnInit{
  
  messageInput: string = '';
  userId: string = '';
  messageList: any[] = [];

  constructor(private chatService: ChatService, private route: ActivatedRoute){


  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params["userId"];
    this.chatService.joinRoom('ABC');
    this.listenerMessage();
  }

  sendMessage() {
    // Logic to send message
    const chatMessage = {
      message: this.messageInput,
      user: this.userId
    }as ChatMessage  
    this.chatService.sendMessage('ABC', chatMessage);
    this.messageInput = '';
  }

  listenerMessage() {
    this.chatService.getMessagesSubject().subscribe((messages: any) => {
      this.messageList= messages.map((item: any) => ({
        ...item,
        message_side: item.user === this.userId ? 'sent' : 'received'
      }))
    })
  }

}
