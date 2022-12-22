import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";


@Injectable({
  providedIn: 'root',
})
export class ChatService {

  public message$: BehaviorSubject<any> = new BehaviorSubject({ message: 'Ready to message'});
  public connections: BehaviorSubject<string> = new BehaviorSubject('Ready for connectiion  ');
  public connectionId: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor() {}

  socket = io('http://localhost:3000');

  public sendMessage(message: any) {
    this.socket.emit('message', message);
  }

  public getNewMessage = () => {
    this.socket.on('message', (message) =>{
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };

  public getConnections = () => {
    this.socket.on('connectionsId', (ab) => {
      this.connectionId.next(ab);
    });
    this.socket.on('connections', (message) => {
      this.connections.next(message);
    });
    return this.connections.asObservable();
  }

}
