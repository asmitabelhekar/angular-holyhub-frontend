import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { CategorylistComponent } from '../../category/categorylist/categorylist.component';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-updatepricepopup',
  templateUrl: './updatepricepopup.component.html',
  styleUrls: ['./updatepricepopup.component.css']
})
export class UpdatepricepopupComponent implements OnInit {

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
  bannerFirstWeekPrice: any;
  bannerNextWeekPrice: any;

  addFirstWeekPrice: any;
  addNextWeekprice: any;
  planIdType: any;



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
    this.status = this.data.status;
    console.log("check status:" + this.status);
    if (this.status == "add") {
      this.status = "add";
      this.selectedType = "";

    } else {
      this.status = "update";
      if (this.data.isAdvertisement == 0) {
        this.selectedType = "0";
        this.planIdType = "0"
      } else {
        this.selectedType = "1"
        this.planIdType = "1"
      }

      this.popup['name'] = this.data.name;
      this.popup['noofday'] = this.data.noOfDays;
      this.popup['price'] = this.data.price;
      this.subscriptionId = this.data.id;
    }

  }

  closeDialog() {
    this.dialogRef.close();
  }

  submit() {

    console.log("show subscription id:" + this.subscriptionId);
    let send_date = {};
    send_date['name'] = this.popup['name'];
    send_date['isAdvertisement'] = this.planIdType;
    send_date['noOfDays'] = this.popup['noofday'];
    send_date['price'] = this.popup['price'];


    if (this.status == "add") {
      let url = environment.main_url + "subscriptions";
      this.apiCall.post(url, send_date).subscribe(MyResponse => {
        this.openSnackBar("Plan added successfully.")
        this.dialogRef.close();
      }, error => {
        this.dialogRef.close();
      });
    } else {
      let url = environment.main_url + "subscriptions/" + this.subscriptionId;
      this.apiCall.put(url, send_date).subscribe(MyResponse => {
        this.openSnackBar("Plan updated successfully.")
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
