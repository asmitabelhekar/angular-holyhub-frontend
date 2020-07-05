import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';
import { MessageService } from 'src/app/services/messages/message.service';
import { NotificationpopupComponent } from '../showpopup/notificationpopup/notificationpopup.component';
import { MatDialog,MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  showAdd = 1;
  checkLength : any;
  config : any;
  totalCount = 0;
  showAction = 1;
  showEdit =1;
  showSend =1;
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
    public dialog: MatDialog,
    public snackbar: MatSnackBar,
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


    let send_data = {};
    send_data['status'] = "add";
   

    const dialogRef = this.dialog.open(NotificationpopupComponent, {
      width: '27%',
      panelClass: 'custom-dialog-container',
      data: send_data
    });

    dialogRef.afterClosed().subscribe(async result => {
      this.getNotificationList(this.url)
    
    });

  }


  edit(data){
    console.log("show edit detail:"+JSON.stringify(data));

    data['status'] = "update";
    const dialogRef = this.dialog.open(NotificationpopupComponent, {
      width: '27%',
      panelClass: 'custom-dialog-container',
      data: data
    });

    dialogRef.afterClosed().subscribe(async result => {
      this.getNotificationList(this.url)
    
    });
  }


  send(data){

    console.log(data);

    let send_date =  {
      "type": 1,
      "title": data.title,
      "body":data.description,
      "advertise_id": 0,
      "details": {}
    }


    let url = environment.main_url + "admin/notification";
    this.apiCall.post(url, send_date).subscribe(MyResponse => {
      this.openSnackBar("Notification sent successfully.")
      
    }, error => {
     
    });

  }

  openSnackBar(msg) {
    this.snackbar.open(msg, "", {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
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
