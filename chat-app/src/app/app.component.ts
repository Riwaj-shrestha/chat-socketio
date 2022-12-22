import { Component } from '@angular/core';
import { ChatService } from './chat.service';

type messageType = {
  user: string;
  message: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  newMessage: string | undefined;
  messageList: messageType[] = [];
  connectionList: any = [];
  public connectionId: any;

  constructor(private chatService: ChatService){

  }

  ngOnInit(){
    this.chatService.connectionId.subscribe(res => {
      this.connectionId = res;
      console.log(res)
    })
    this.chatService.getNewMessage().subscribe((message) => {
      console.log(message);

      this.messageList.push(message);
    });
    this.chatService.getConnections().subscribe((connection: string) => {
      console.log('connections:',connection);
      this.connectionList.push(connection);
    });
  }

  sendMessage() {
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
  }
}
