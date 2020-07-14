import { Component, OnInit } from '@angular/core';
import { UpdatepricepopupComponent } from '../showpopup/updatepricepopup/updatepricepopup.component';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';
import { MatDialog,MatSnackBar } from '@angular/material';
import { MessageService } from 'src/app/services/messages/message.service';

@Component({
  selector: 'app-updateprice',
  templateUrl: './updateprice.component.html',
  styleUrls: ['./updateprice.component.css']
})
export class UpdatepriceComponent implements OnInit {

 
  config : any;
  totalCount = 0;
  columnArray: any = [
    { "name": "Sr No", "key": "index" },
    { "name": "Plan Type", "key": "isAdvertisement" },
    { "name": "Plan Name", "key": "name" },
    { "name": "Days", "key": "noOfDays" },
    { "name": "Price", "key": "price" }
  ];
  
  currentPage = 0;
  dataArray : any = [];
  checkLength : any;
 
  pageIndex : any = 0;
  lastPage : any = 0;
  showFilter = 0;
  url  ;



  // url: any;
  // dataArray: any = [];
  bannerFirstWeekPrice: any = "7";
  bannerNextWeekPrice: any = "5";
  bannerSubscriptionId : any ;
  addSubscriptionId : any;
  addFirstWeekPrice: any = "7";
  addNextWeekPrice: any = "5";


  constructor(
    public dialog: MatDialog,
    public messageService : MessageService,
    public apiService: ApiService,
    public snackbar : MatSnackBar
  ) { }

  ngOnInit() {
    this.broadCastMessage();
    this.getAllPrice();
  }


  broadCastMessage(): void {
    this.messageService.broadCastMessage("Plans");
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

  getAllPriceWithSearch(search) {
    let bannerUrl = environment.main_url + "subscriptions"+ "?search=" + search;
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

  add() {
    let send_data = {};
    send_data['status'] = "add";
   

    const dialogRef = this.dialog.open(UpdatepricepopupComponent, {
      width: '27%',
      panelClass: 'custom-dialog-container',
      data: send_data
    });

    dialogRef.afterClosed().subscribe(async result => {
      this.getAllPrice();
    
    });
  }

  edit(data){
    console.log("show edit detail:"+JSON.stringify(data));
   
    const dialogRef = this.dialog.open(UpdatepricepopupComponent, {
      width: '27%',
      panelClass: 'custom-dialog-container',
      data: data
    });

    dialogRef.afterClosed().subscribe(async result => {
      this.getAllPrice();
    
    });
  }

  deletePlan(item){
    if(confirm("Are you sure to delete " +item.name +" plan ?")) {
    this.url = environment.main_url  + "subscriptions/"+item.id;
    this.apiService.deleteEntry(this.url).subscribe((response) => {
      
      this.openSnackBar("Deleted successfully.");
      this.getAllPrice();
     
    })
   }
  }

  openSnackBar(msg) {
    this.snackbar.open(msg, "", {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
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

  search(event){

    this.checkLength = event.target.value;
    console.log("search event",this.checkLength);
    if (this.checkLength.length > 2) {
      this.getAllPriceWithSearch(event.target.value);
    } else {
      this.getAllPrice(); 
    }


  }
}
