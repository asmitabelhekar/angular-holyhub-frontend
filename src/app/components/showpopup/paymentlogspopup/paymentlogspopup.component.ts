
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { CategorylistComponent } from '../../category/categorylist/categorylist.component';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-paymentlogspopup',
  templateUrl: './paymentlogspopup.component.html',
  styleUrls: ['./paymentlogspopup.component.css']
})
export class PaymentlogspopupComponent implements OnInit {

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
  allData:any;



  constructor(
    public dialogRef: MatDialogRef<CategorylistComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public changeDetectorRef: ChangeDetectorRef,
    public snackbar: MatSnackBar,
    public apiCall: ApiService,
    public router: Router
  ) { }

  ngOnInit() {
    console.log("show data:" + JSON.stringify(this.data));
    this.formName = "Payment logs";

    this.allData = this.data;
    // this.status = this.data.status;
    // console.log("check status:" + this.status);
    // if (this.status == "add") {
    //   this.status = "add";
    //   this.formName = "Add";
    //   // this.selectedType = "";

    // } else if (this.status == "send"){

    //   this.formName = "Send";
    //   console.log("hhsshh");
    //    this.status = "send";
    //   // this.popup['name'] = '';
    //   // this.popup['description'] ='';
      
    // }else {
    //   this.formName = "Update";
    //   this.status = "update";
    //   // if (this.data.isAdvertisement == 0) {
    //   //   this.selectedType = "0";
    //   //   this.planIdType = "0"
    //   // } else {
    //   //   this.selectedType = "1"
    //   //   this.planIdType = "1"
    //   // }

    //   this.popup['name'] = this.data.title;
    //   this.popup['description'] = this.data.description;
     
    //   this.subscriptionId = this.data.id;
    // }

  }

  closeDialog() {
    this.dialogRef.close();
  }

  submit() {

    console.log("show subscription id:" + this.subscriptionId);
    let send_date = {};
    send_date['title'] = this.popup['name'];
    send_date['description'] =this.popup['description'];
    send_date['categoryId'] = 0;
   

  

    if (this.status == "add") {
      let url = environment.main_url + "notifications";
      this.apiCall.post(url, send_date).subscribe(MyResponse => {
        this.openSnackBar("Notification added successfully.")
        this.dialogRef.close();
      }, error => {
        this.dialogRef.close();
      });
    }else if(this.status == "send"){

      let send_date =  {
        "type": 2,
        "title": this.popup['name'],
        "body":this.popup['description'],
        "advertise_id": this.data.adId,
        "details": {
          "id" :  this.data.adId,
          "categoryId": this.data.categoryId,
          "status": "category",
          "adType": 1,
          "isBookmarked":this.data.isBookmarked
        }
      }

    let url = environment.main_url + "admin/notification";
    this.apiCall.post(url, send_date).subscribe(MyResponse => {
      this.openSnackBar("Notification sent successfully.")
      this.dialogRef.close();
    }, error => {
      this.dialogRef.close();
    });

    } else {
      let url = environment.main_url + "notifications/" + this.subscriptionId;
      this.apiCall.put(url, send_date).subscribe(MyResponse => {
        this.openSnackBar("Notification updated successfully.")
        this.dialogRef.close();
      }, error => {
        this.dialogRef.close();
      });
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