import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';
import { MessageService } from 'src/app/services/messages/message.service';
import { MatDialog,MatSnackBar } from '@angular/material';
import { PaymentlogspopupComponent } from '../../showpopup/paymentlogspopup/paymentlogspopup.component';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  showAdd : any = 0;
  showFilter : any = 1;
  checkLength : any;
  config : any;
  totalCount = 0;
  columnArray: any = [
    { "name": "Sr No", "key": "index" },
    { "name": "Name", "key": "name" },
    { "name": "Mobile", "key": "mobile" },
    { "name": "Email", "key": "email" },
    { "name": "Photo", "key": "image" },
    { "name": "Total Earnings", "key": "totalEarning" }
  ];

  filterArray = [{"id":1,"name":"Admin","parameter":"admin"},{"id":0,"name":"Users","parameter":"users"},{"id":3,"name":"All","parameter":"clear"}]

  
  currentPage = 0;
  dataArray : any = [];
 
  pageIndex : any = 0;
  lastPage : any = 0;
  showView =1;
  

  url : any ;

  constructor(public router : Router,
    public messageService : MessageService,
    public dialog: MatDialog,
    public snackbar: MatSnackBar,
    public apiCall : ApiService) { }

  ngOnInit() {
    this.broadCastMessage();
    this.url = environment.main_url + "users?page=" + this.currentPage + "&size=10000";
    this.getUsersList(this.url);
  }



  broadCastMessage(): void {
    this.messageService.broadCastMessage("Users");
 }
  getUsersList(url){

    this.apiCall.get(url).subscribe((response)=>{

      this.dataArray = response['result']['list'];
      this.totalCount = response['result']['count'];
      this.lastPage = Math.ceil(this.totalCount / 1);
    })
  }

  paginate(event) {
    console.log("currentPage::" +event);

    this.currentPage = event;

    this.url = environment.main_url + "users?page=" + this.currentPage + "&size=10";
    this.getUsersList(this.url);

  }

  filter(id){

    if(id ==0 || id==1){
    let filter = {"user_role":id};
    this.url = environment.main_url + "users?page=" + this.currentPage + "&size=10000&filters="+JSON.stringify(filter);
    }else{
      this.url = environment.main_url + "users?page=" + this.currentPage + "&size=10000";
    }
    this.getUsersList(this.url);

  }

  add(event){

    console.log("delete event",event);
    // this.router.navigate(['admin/addlanguage']);
  }

  view(data){

    console.log("show edit detail:"+JSON.stringify(data));


    // /api/v1.0.0/payment-gateway-logs
    let filter = {"userId":data.id};
    this.url = environment.main_url + "payment-gateway-logs?page=" + this.currentPage + "&size=10000&filters="+JSON.stringify(filter);

    let send_data ;
    // send_data['status'] = "add";
    this.apiCall.get(this.url).subscribe((response)=>{

      let result = response['result']['list'];

      console.log("my results",""+JSON.stringify(result));


      if(result.length > 0){

        send_data = result;

        send_data[0]['user_name'] = data.name;

    const dialogRef = this.dialog.open(PaymentlogspopupComponent, {
      width: '54%',
      panelClass: 'custom-dialog-container',
      data: send_data,
    });

    dialogRef.afterClosed().subscribe(async result => {
      this.url = environment.main_url + "users?page=" + this.currentPage + "&size=10000";
      this.getUsersList(this.url);
    });



      }else{

        this.openSnackBar("No payments logs available")

      }


      // this.totalCount = response['result']['count'];
      // this.lastPage = Math.ceil(this.totalCount / 1);
    })



   
   
   

    console.log("checkkk  "+JSON.stringify(event));

  }


  disableComponent(event) {
   

    this.url = environment.main_url +"users/"+event.id+ "/userActiveInactive";
    
    this.apiCall.putWithoutData(this.url).subscribe((response)=>{
      if(event.isActive){
        this.openSnackBar("User disabled successfully.")
      }else{
        this.openSnackBar("User enabled successfully.")
      }
      this.url = environment.main_url + "users?page=" + this.currentPage + "&size=10000";
      this.getUsersList(this.url);
    })
  }


  search(event) {
    this.checkLength = event.target.value;
    console.log("search event",this.checkLength);
    if (this.checkLength.length > 2) {
      this.url = environment.main_url +  "users?search=" + event.target.value;
      this.getUsersList(this.url);
    } else {
      this.url = environment.main_url + "users?page=" + this.currentPage + "&size=10000";
      this.getUsersList(this.url);
    }

  }


  openSnackBar(msg) {
    this.snackbar.open(msg, "", {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }


}
