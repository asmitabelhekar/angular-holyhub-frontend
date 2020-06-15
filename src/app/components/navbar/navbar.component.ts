import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/messages/message.service';
import { SidemenuComponent } from '../sidemenu/sidemenu.component';
import { Router } from '@angular/router';


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
    public messageService : MessageService,
    public sideMenu : SidemenuComponent,
    public router : Router
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


  goBackWord(name){
    console.log("check name:"+name);
    // this.sideMenu.activeIndex("2",this.title);
    if(name == "Dashboard"){

    }else if(name == "Advertisement"){
      console.log("show navbar  title :" + name);
      window.history.back();
      this.sideMenu.activeIndex(1,this.title);
    }
    else if(name == "Banner"){
      console.log("show navbar  title :" + name);
      window.history.back();
      this.sideMenu.activeIndex("2",this.title);
    }
    else if(name == "Plans"){
      console.log("show navbar  title :" + name);
      window.history.back();
      this.sideMenu.activeIndex(3,this.title);
    }
    else if(name == "Category"){
      console.log("show navbar  title :" + name);
      window.history.back();
      this.sideMenu.activeIndex(4,this.title);
    }
    else if(name == "Language"){
      console.log("show navbar  title :" + name);
      window.history.back();
      this.sideMenu.activeIndex(5,this.title);
    }
    else if(name == "Users"){
      console.log("show navbar  title :" + name);
      window.history.back();
      this.sideMenu.activeIndex(6,this.title);
    }
    else if(name == "Notification"){
      console.log("show navbar  title :" + name);
      window.history.back();
      this.sideMenu.activeIndex(7,this.title);
    }else{

    }
  }

  logout(){
    this.router.navigate(['/login']);
  }
}
