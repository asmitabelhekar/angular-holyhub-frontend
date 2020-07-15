import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MessageService } from 'src/app/services/messages/message.service';
@Component({
  selector: 'app-paymentlogs',
  templateUrl: './paymentlogs.component.html',
  styleUrls: ['./paymentlogs.component.css']
})
export class PaymentlogsComponent implements OnInit {

  checkLength : any;
  planType = [
    {
      "type": "Advertisement",
      "id": "0"
    },
    {
      "type": "Banner",
      "id": "1"
    }];
  status: any;
  popup: any = {};
  errorMessage: any;
  subscriptionId: any;
  selectedType = "Advertisement";
  formName:any;
  bannerFirstWeekPrice: any;
  bannerNextWeekPrice: any;

  addFirstWeekPrice: any;
  addNextWeekprice: any;
  planIdType: any;
  dataArray:any;
  currentPage = 0;
  url:any;
  showFilter = 0;
  displayedColumns: any = [
    { "name": "Sr No", "key": "index" },
    { "name": "Title", "key": "title" },
    { "name": "Payment Id", "key": "paymentId" },
    { "name": "Date", "key": "modified" },
    { "name": "Amount", "key": "amount" },
  ];

 
  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public messageService : MessageService,
    public snackbar: MatSnackBar,
    public apiCall: ApiService,
    public router: Router
  ) { }

  ngOnInit() {
    this.broadCastMessage();
    this.formName = "Payment logs";
    this.getAllPaymentLogs();
    
  }


  broadCastMessage(): void {
    this.messageService.broadCastMessage("Payments Logs");
 }


  getAllPaymentLogs(){

    this.url = environment.main_url + "payment-gateway-logs" ;

    let send_data ;
    // send_data['status'] = "add";
    this.apiCall.get(this.url).subscribe((response)=>{

      this.dataArray = response['result']['list'];

    });


  }


  search(event) {
    this.checkLength = event.target.value;
    console.log("search event",this.checkLength);
    if (this.checkLength.length > 2) {

      this.url = environment.main_url + "payment-gateway-logs?search=" + event.target.value;
      this.apiCall.get(this.url).subscribe((response)=>{
  
        this.dataArray = response['result']['list'];
  
      });

    } else {
      this.getAllPaymentLogs();
    }

  }

  

  selectPlanType(type){
this.planIdType = type;
console.log("show type:"+type);
  }

  openSnackBar(msg) {
    this.snackbar.open(msg, "", {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

}
