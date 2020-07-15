import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';
import { MatDialog,MatSnackBar } from '@angular/material';
import { AdvertisementdetailpopupComponent } from '../../showpopup/advertisementdetailpopup/advertisementdetailpopup.component';
import { MessageService } from 'src/app/services/messages/message.service';
import { NotificationpopupComponent } from '../../showpopup/notificationpopup/notificationpopup.component';
@Component({
  selector: 'app-advertisementlist',
  templateUrl: './advertisementlist.component.html',
  styleUrls: ['./advertisementlist.component.css']
})
export class AdvertisementlistComponent implements OnInit {


  config : any;
  totalCount = 0;
  columnArray: any = [
    { "name": "Name", "key": "title" },
    { "name": "Image", "key": "images" },
    { "name": "Description", "key": "description" },
    { "name": "Address", "key": "address" },
    
  ];
  
  currentPage = 0;
  dataArray : any = [];
  checkLength : any;
  pageIndex : any = 0;
  lastPage : any = 0;
  categoryId = 4;
  
  categoryArray : any;
  sortArray = [{"id":1,"name":"Low to High","parameter":"low_to_high"},{"id":2,"name":"High to Low","parameter":"high_to_low"},{"id":3,"name":"Clear","parameter":"clear"}]

  url : any; ;


  constructor(public router : Router,
    public dialog : MatDialog,
    public messageService : MessageService,
    public snackbar: MatSnackBar,
    public apiCall : ApiService) { }

  ngOnInit() {
    this.broadCastMessage();
    this.getCategory();
    this.url = environment.main_url + "advertisements?" + "size=1000";
    // this.url = environment.main_url +  "advertisements?page=" + this.currentPage + "&size=1000";
    this.getAdvertisementList(this.url);
  }


  broadCastMessage(): void {
    this.messageService.broadCastMessage("Advertisement");
 }


  getAdvertisementList(url){

    this.apiCall.getAd(url).subscribe((response)=>{

      this.dataArray = response['result']['list'];
      this.totalCount = response['result']['count'];
      this.lastPage = Math.ceil(this.totalCount / 5);
    })
  }

  paginate(event) {
    console.log("currentPage::" +event);

    this.currentPage = event;

    this.url = environment.main_url + "advertisements?page=" + this.currentPage + "&size=1000";

    this.getAdvertisementList(this.url);

  }

  disableComponent(event) {
    let userId =48;
    this.url = environment.main_url +"users/"+userId+ "/advertisementsActiveInactive/"+event.id;
    
    this.apiCall.putWithoutData(this.url).subscribe((response)=>{
      if(event.isActive){
        this.openSnackBar("Disabled successfully.")
      }else{
        this.openSnackBar("Enabled successfully.")
      }

      this.url = environment.main_url + "advertisements?page=" + this.currentPage + "&size=1000";
      this.getAdvertisementList(this.url);
    })
  }


  add(event) {
    this.router.navigate(['/']);
    // this.showPopup();
  }

  filter(event) {
  console.log("show filter data:"+event);
    this.categoryId = event;
    this.url = environment.main_url +"categories/"+this.categoryId+ "/advertisements?page=" + this.currentPage + "&size=1000";
    this.getAdvertisementList(this.url);
  }
  sort(event){

    if(this.categoryId !=4){

      this.url = environment.main_url +"categories/"+this.categoryId + "/advertisements?page=" + this.currentPage + "&sort="+event.parameter+"&size=1000";
  

    }else{

      this.url = environment.main_url + "advertisements?page=" + this.currentPage + "&sort="+event.parameter+"&size=1000";
  

    }
    
    this.getAdvertisementList(this.url);

  }

  getCategory() {
    let url = environment.main_url + "category/" + 0 + "/sub-category"
    this.apiCall.get(url).subscribe(MyResponse => {
      this.categoryArray = MyResponse['result']['list'];

      console.log("jjjj",""+JSON.stringify(this.categoryArray));
    },
      error => {
       
      });
  }


  search(event) {
    this.checkLength = event.target.value;
    console.log("search event",this.checkLength);
    if (this.checkLength.length > 2) {
    this.url = environment.main_url +  "advertisements?search=" + event.target.value;

      this.getAdvertisementList(this.url);
    } else {
      this.url = environment.main_url + "advertisements";
      this.getAdvertisementList(this.url);
    }

  }

  viewDetail(item){
    console.log("show advertisement detail:"+JSON.stringify(item));

    let send_data = {};
    send_data['type'] = "Advertisement";
    send_data['image'] = item.images[0];
    send_data['title'] = item.title;
    send_data['description'] = item.description;
    send_data['price'] = item.price;
    send_data['startDateTime'] = item.startDateTime;
    send_data['endDateTime'] = item.endDateTime;

    const dialogRef = this.dialog.open(AdvertisementdetailpopupComponent, {
      width: '30%',
      panelClass: 'custom-ad-dialog-container',
      data: send_data
    });

    dialogRef.afterClosed().subscribe(async result => {
      this.url = environment.main_url + " advertisements?page=" + this.currentPage + "&size=1000";
      this.getAdvertisementList(this.url);
    });
  }


  sendNotif(item){
    console.log("show advertisement detail:"+JSON.stringify(item));

    let send_data = {};
    send_data['adId'] = item.id;
    send_data['categoryId'] = item.categoryId;
    send_data['isBookmarked'] = item.isBookmarked;
    // send_data['image'] = item.images[0];
    // send_data['title'] ="";
    // send_data['description'] = "";
    // send_data['price'] = item.price;
    // send_data['startDateTime'] = item.startDateTime;
    // send_data['endDateTime'] = item.endDateTime;
    send_data['status'] = "send";
    const dialogRef = this.dialog.open(NotificationpopupComponent, {
      width: '27%',
      panelClass: 'custom-dialog-container',
      data: send_data
    });

    dialogRef.afterClosed().subscribe(async result => {
      this.url = environment.main_url + " advertisements?page=" + this.currentPage + "&size=1000";
      this.getAdvertisementList(this.url);
    });

    
  }


  showPopup() {
  
  }

  edit(event){
    console.log("show edit event:"+JSON.stringify(event));

    // let send_data = {};
    // send_data['status'] = "update";
    // send_data['id'] = event.id;
    // send_data['name'] = event.name;
    // send_data['image'] = event.image;
    
    // const dialogRef = this.dialog.open(LanguagepopupComponent, {
    //   width: '35%',
    //   panelClass: 'custom-dialog-container',
    //   data: send_data
    // });

    // dialogRef.afterClosed().subscribe(async result => {
    //   this.getLanguagesList();
    // });
   
  }

  openSnackBar(msg) {
    this.snackbar.open(msg, "", {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}


