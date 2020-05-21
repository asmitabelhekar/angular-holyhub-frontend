import { Component, OnInit } from '@angular/core';
import { UpdatepricepopupComponent } from '../showpopup/updatepricepopup/updatepricepopup.component';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-updateprice',
  templateUrl: './updateprice.component.html',
  styleUrls: ['./updateprice.component.css']
})
export class UpdatepriceComponent implements OnInit {

  url: any;
  dataArray: any = [];
  bannerFirstWeekPrice: any = "7";
  bannerNextWeekPrice: any = "5";
  bannerSubscriptionId : any ;
  addSubscriptionId : any;
  addFirstWeekPrice: any = "7";
  addNextWeekPrice: any = "5";


  constructor(
    public dialog: MatDialog,
    public apiService: ApiService,
  ) { }

  ngOnInit() {
    this.getAllPrice();
  }


  getAllPrice() {
    let bannerUrl = environment.main_url + "subscriptions";
    this.apiService.get(bannerUrl).subscribe((response) => {

      this.dataArray = response['result']['list'];

      for(let i=0; i< this.dataArray.length; i++){
        if(this.dataArray[i]['name'] == "banner" || this.dataArray[i]['name'] == "Banner"){
          this.bannerFirstWeekPrice = this.dataArray[i]['firstWeekPrice'];
          this.bannerNextWeekPrice = this.dataArray[i]['furtherOnwardsPrice'];
          this.bannerSubscriptionId = this.dataArray[i]['id'];
        }
        else  if(this.dataArray[i]['name'] == "advertisement" || this.dataArray[i]['name'] == "Advertisement"){
          this.addFirstWeekPrice = this.dataArray[i]['firstWeekPrice'];
          this.addNextWeekPrice = this.dataArray[i]['furtherOnwardsPrice'];
          this.addSubscriptionId = this.dataArray[i]['id'];
        }
        else{
          this.bannerFirstWeekPrice = this.dataArray[i]['firstWeekPrice'];
          this.bannerNextWeekPrice = this.dataArray[i]['furtherOnwardsPrice'];
          this.bannerSubscriptionId = this.dataArray[i]['id'];
        }
      }

    })
  }


  upDateBannerPrice() {
    let send_data = {};
    send_data['name'] = "Banner";
    send_data['firstWeekPrice'] = this.bannerFirstWeekPrice;
    send_data['nextWeekPrice'] = this.bannerNextWeekPrice;
    send_data['subscriptionId'] = this.bannerSubscriptionId;

    const dialogRef = this.dialog.open(UpdatepricepopupComponent, {
      width: '27%',
      panelClass: 'custom-dialog-container',
      data: send_data
    });

    dialogRef.afterClosed().subscribe(async result => {
      this.getAllPrice();
    
    });
  }

  upDateAdvertisementPrice() {
    let send_data = {};
    send_data['name'] = "Advertisement";
    send_data['firstWeekPrice'] = this.addFirstWeekPrice;
    send_data['nextWeekPrice'] = this.addNextWeekPrice;
    send_data['subscriptionId'] = this.addSubscriptionId


    const dialogRef = this.dialog.open(UpdatepricepopupComponent, {
      width: '27%',
      panelClass: 'custom-dialog-container',
      data: send_data
    });

    dialogRef.afterClosed().subscribe(async result => {
      this.getAllPrice();
      
    });
  }
}
