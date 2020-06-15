import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/messages/message.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

  indexActive: any = 0;
  url : any;
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
      name: 'Banner',
      url: '/admin/bannerlist'
    },
    {
      icon: 'description',
      name: 'Plans',
      url: '/admin/updateprice'
    },
    {
      icon: 'description',
      name: 'Category',
      url: '/admin/categorylist'
    },
    {
      icon: 'language',
      name: 'Language',
      url: '/admin/languagelist'
    },
    {
      icon: 'people',
      name: 'Users',
      url: '/admin/userlist'
    }, {
      icon: 'notifications_none',
      name: 'Notification',
      url: '/admin/notifications'
    }
   
  ]

  constructor(public messageService : MessageService) { }

  ngOnInit() {
  }
  activeIndex(index,url) {
    // this.indexActive = index;
    // this.url = url;
    // console.log("show sidemenu url:"+url);
    // this.broadCastMessage();

    this.indexActive = index;
    this.url = url;
    console.log("show sidemenu index:"+index);
    console.log("show sidemenu url:"+url);
    this.broadCastMessage();
  }


  broadCastMessage(): void {
    this.messageService.broadCastMessage(this.url);
 }

 removeMessages(): void {
   // clear messages
   this.messageService.removeMessages();
 }

}
