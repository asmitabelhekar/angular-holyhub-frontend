import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/messages/message.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  subscription: Subscription;
  chat: any[] = [];
  title = "Dashboard";
  
  constructor(
    public messageService : MessageService
  ) { 
    
  }

  ngOnInit() {
    this.subscription = this.messageService.retriveMessage().subscribe(message => {
      if (message) {
        console.log("show retrived msg:" + JSON.stringify(message));
        this.title = message['text'];
        console.log("show navbar changes title inside :" + this.title);

        this.chat.push(message);
      } else {
        // clear messages when empty message received
        this.chat = [];
      }
    });
  }

  logout(){
    
  }
}
