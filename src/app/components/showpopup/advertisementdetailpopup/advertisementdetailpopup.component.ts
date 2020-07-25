import { Component, OnInit, Inject, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { CategorylistComponent } from '../../category/categorylist/categorylist.component';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { AdvertisementlistComponent } from '../../advertisement/advertisementlist/advertisementlist.component';


@Component({
  selector: 'app-advertisementdetailpopup',
  templateUrl: './advertisementdetailpopup.component.html',
  styleUrls: ['./advertisementdetailpopup.component.css']
})
export class AdvertisementdetailpopupComponent implements OnInit {

  type : any;
  image: any;
  title: any;
  viewCount:any;
  description: any;
  price: any;
  startDateTime : any;
  endDateTime : any;
  getAdvertisementDetail: any;
  selectedWeek : any;
  advertisementModel : any = {};
  getStartDate : any;
  getEndDate : any;
  edom: any;
  edod : any;
  sdom: any;
  sdod : any;
  edoy : any;

 allData = []

  constructor(
    public dialogRef: MatDialogRef<AdvertisementlistComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public changeDetectorRef: ChangeDetectorRef,
    public snackbar: MatSnackBar,
    public apiCall: ApiService,
    public router: Router
  ) { }


  ngOnInit() {

    console.log("kkkkkkk",""+JSON.stringify( this.data));
    this.type = this.data.type;
    this.title= this.data.title;
    this.description= this.data.description;
    this.image= this.data.image;
    this.price= this.data.price;
    this.startDateTime = this.data.startDateTime;
    this.endDateTime = this.data.endDateTime;
    this.viewCount =  this.data.viewCount;
    this.selectedWeek = this.getBannerDate(this.startDateTime, this.endDateTime);
   
    if(this.data.paymentDetails !=null){
      this.allData = this.data.paymentDetails.list
    }else{
      this.allData = [];
    }
   
    console.log("show dates:"+this.startDateTime);

  }

  
  getBannerDate(start, end) {
    //get from date
    var ts_ms = start * 1000;
    var date_ob = new Date(ts_ms);
    var year = date_ob.getFullYear();
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var date = ("0" + date_ob.getDate()).slice(-2);
    this.getStartDate = month + "/" + date + "/" + year;
    this.sdom = month;
    this.sdod = date;
    var dateToday = new Date(year, parseInt(month), parseInt(date));


    //get end date
    var end_date_ob_ts_ms = end * 1000;
    var end_date_ob = new Date(end_date_ob_ts_ms);
    var end_date_ob_year = end_date_ob.getFullYear();
    this.edoy = end_date_ob_year;
    var end_date_ob_month = ("0" + (end_date_ob.getMonth() + 1)).slice(-2);
    this.edom = end_date_ob_month;
    var end_date_ob_date = ("0" + end_date_ob.getDate()).slice(-2);
    this.edod = end_date_ob_date;
    this.getEndDate =this.sdod + "." + this.sdom+ " - " + this.edod + "." + this.edom + "." + this.edoy;

    console.log("show final date: " + this.getStartDate + " / " + this.getEndDate);
  // this.bannerModel['fromDate'] = getStartDate;

  
  this.advertisementModel['fromDate'] = new Date(this.getStartDate);
  this.advertisementModel['toDate'] = new Date(this.getEndDate);
 
    // console.log("show weeks:" + weeks);

    // return Math.abs(weeks);

  }

  closeDialog(){
    this.dialogRef.close();
  }

}
