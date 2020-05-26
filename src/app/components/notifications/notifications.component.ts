import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';
import { MessageService } from 'src/app/services/messages/message.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  showAdd = 0;
  checkLength : any;
  config : any;
  totalCount = 0;
  showAction = 0;
  showFilter = 0;
  displayedColumns: any = [
    { "name": "Title", "key": "title" },
    { "name": "Description", "key": "description" },
  ];
  
  currentPage = 0;
  dataArray : any = [];
 
  pageIndex : any = 0;
  lastPage : any = 0;

  url : any ;

  constructor(public router : Router,
    public messageService : MessageService,
    public apiCall : ApiService) { }

  ngOnInit() {
    this.broadCastMessage();
    this.url = environment.main_url + "notifications?page=" + this.currentPage + "&size=10";
    this.getNotificationList(this.url);
  }


  broadCastMessage(): void {
    this.messageService.broadCastMessage("Notification");
 }

  getNotificationList(url){

    this.apiCall.get(url).subscribe((response)=>{

      this.dataArray = response['result']['list'];
      this.totalCount = response['result']['count'];
      this.lastPage = Math.ceil(this.totalCount / 1);
    })
  }

  paginate(event) {
    console.log("currentPage::" +event);

    this.currentPage = event;

    this.url = environment.main_url + "notifications?page=" + this.currentPage + "&size=10";
    this.getNotificationList(this.url);

  }

  add(event){

    console.log("delete event",event);
    // this.router.navigate(['admin/addlanguage']);
  }


  search(event) {
    this.checkLength = event.target.value;
    console.log("search event",this.checkLength);
    if (this.checkLength.length > 2) {
      this.url = environment.main_url +  "notifications?search=" + event.target.value;
      this.getNotificationList(this.url);
    } else {
      this.url = environment.main_url + "notifications";
      this.getNotificationList(this.url);
    }

  }
}
