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

  nameType: any;
  popup: any = {};
  errorMessage: any;
  subscriptionId : any;

  bannerFirstWeekPrice: any;
  bannerNextWeekPrice: any;

  addFirstWeekPrice: any;
  addNextWeekprice: any;

  constructor(
    public dialogRef: MatDialogRef<CategorylistComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public changeDetectorRef: ChangeDetectorRef,
    public snackbar: MatSnackBar,
    public apiCall: ApiService,
    public router: Router
  ) { }

  ngOnInit() {
    console.log("show data:" + (this.data.name));
    this.nameType = this.data.name;
    if(this.nameType == "banner" || this.nameType == "Banner"){
      this.bannerFirstWeekPrice = this.data.firstWeekPrice;
      this.bannerNextWeekPrice = this.data.nextWeekPrice;
      this.subscriptionId = this.data.subscriptionId;


      this.popup['name'] = this.nameType;
      this.popup['firstPrice'] = this.bannerFirstWeekPrice;
      this.popup['nextPrice'] = this.bannerNextWeekPrice;

    }
    else  if(this.nameType == "advertisement" || this.nameType == "Advertisement"){
      this.addFirstWeekPrice = this.data.firstWeekPrice;
      this.addNextWeekprice = this.data.nextWeekPrice;
      this.subscriptionId = this.data.subscriptionId;

      this.popup['name'] = this.nameType;
      this.popup['firstPrice'] = this.addFirstWeekPrice;
      this.popup['nextPrice'] = this.addNextWeekprice;
    }
    else{
      this.bannerFirstWeekPrice = this.data.firstWeekPrice;
      this.bannerNextWeekPrice = this.data.nextWeekPrice;

      this.popup['name'] = this.nameType;
      this.popup['firstPrice'] = this.bannerFirstWeekPrice;
      this.popup['nextPrice'] = this.bannerNextWeekPrice;
    }

  }

  closeDialog() {
    this.dialogRef.close();
  }

  submit() {

    console.log("show subscription id:"+this.subscriptionId);
    let send_date = {};
    send_date['name'] = this.popup['name'];
    send_date['firstWeekPrice'] = this.popup['firstPrice'];
    send_date['furtherOnwardsPrice'] = this.popup['nextPrice'];

    let url = environment.main_url + "subscriptions/" + this.subscriptionId;
    this.apiCall.put(url, send_date).subscribe(MyResponse => {
      this.openSnackBar("Price updated successfully.")
      this.dialogRef.close();
    }, error => {
      this.dialogRef.close();
    });

  }

  openSnackBar(msg) {
    this.snackbar.open(msg, "", {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

}
