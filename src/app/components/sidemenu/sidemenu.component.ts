import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/messages/message.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

  indexActive: any = 0;
  title : any;
  menuItems = [
    {
      icon: 'dashboard',
      name: 'Dashboard',
      url: '/admin/dashboard'
    },
    {
      icon: 'description',
      name: 'Advertisement',
      url: '/admin/advertisementlist'
    },
    {
      icon: 'description',
      name: 'Pricing',
      url: '/admin/updateprice'
    },
    {
      icon: 'description',
      name: 'Category',
      url: '/admin/categorylist'
    },
    {
      icon: 'swap_vert',
      name: 'Language',
      url: '/admin/languagelist'
    },
    {
      icon: 'people',
      name: 'Users',
      url: '/admin/userlist'
    }
   
  ]

  constructor(public messageService : MessageService) { }

  ngOnInit() {
  }
  activeIndex(index,title) {
    this.indexActive = index;
    this.title = title;
    console.log("show sidemenu url:"+title);
    this.broadCastMessage();
  }


  broadCastMessage(): void {
    this.messageService.broadCastMessage(this.title);
 }

 removeMessages(): void {
   // clear messages
   this.messageService.removeMessages();
 }

}
