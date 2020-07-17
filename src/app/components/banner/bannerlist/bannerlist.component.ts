import { Component, OnInit, Inject, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { CategorylistComponent } from '../../category/categorylist/categorylist.component';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { BannerupdateComponent } from '../bannerupdate/bannerupdate.component';
import { MessageService } from 'src/app/services/messages/message.service';
import { AdvertisementdetailpopupComponent } from '../../showpopup/advertisementdetailpopup/advertisementdetailpopup.component';
@Component({
  selector: 'app-bannerlist',
  templateUrl: './bannerlist.component.html',
  styleUrls: ['./bannerlist.component.css']
})
export class BannerlistComponent implements OnInit {

  config : any;
  totalCount = 0;
  columnArray: any = [
    { "name": "Name", "key": "title" },
    { "name": "Banner Image", "key": "image" },
    { "name": "Description", "key": "description" },
    { "name": "Address", "key": "city" },
    
  ];

  sortArray = [{"id":1,"name":"Latest","parameter":"latest"},{"id":2,"name":"Old","parameter":"old"},{"id":3,"name":"Clear","parameter":"clear"}]

  
  currentPage = 0;
  dataArray : any = [];
  checkLength : any;
  pageIndex : any = 0;
  lastPage : any = 0;
  categoryId = "1";
  broadCastStatus : any;
  categoryArray : any;
  url : any; ;


  constructor(public router : Router,
    public dialog : MatDialog,
    public snackbar: MatSnackBar,
    public messageService : MessageService,
    public apiCall : ApiService) { }

  ngOnInit() {
    this.getCategory();
    this.broadCastMessage();
    this.url = environment.main_url  + "banners?" + "size=1000&is_admin=1";
    this.getBannerList(this.url);
  }

  getBannerList(url){

    this.apiCall.get(url).subscribe((response)=>{

      this.dataArray = response['result']['list'];
      this.totalCount = response['result']['count'];
      this.lastPage = Math.ceil(this.totalCount / 5);
    })
  }

  paginate(event) {
    console.log("currentPage::" +event);

    this.currentPage = event;
    this.url = environment.main_url  + "banners?" + "size=1000&is_admin=1";
    // this.url = environment.main_url + "category/" + this.categoryId + "/banners?page=" + this.currentPage + "&size=5";

    this.getBannerList(this.url);

  }


  add(event) {
    // this.showPopup();
  }

  getCategory() {
    let url = environment.main_url + "category/" + 0 + "/sub-category"
    this.apiCall.get(url).subscribe(MyResponse => {
      this.categoryArray = MyResponse['result']['list'];
    },
      error => {
       
      });
  }

  filter(event) {
  console.log("show filter data:"+event);
    this.categoryId = event;
   
    // this.url = environment.main_url  + "banners?" + "&size=1000";
    this.url = environment.main_url + "category/" + this.categoryId + "/banners?page=" + this.currentPage + "&size=1000&is_admin=1";
    this.getBannerList(this.url);
  }

  sort(event){

     if(this.categoryId !="1"){

      this.url = environment.main_url + "category/" + this.categoryId + "/banners?page=" + this.currentPage + "&sort="+event.parameter+"&size=1000&is_admin=1";


     }else{

      this.url = environment.main_url + "banners?page=" + this.currentPage + "&sort="+event.parameter+"&size=1000&is_admin=1";

     }
  
    this.getBannerList(this.url);
  }


  search(event) {
   
    this.checkLength = event.target.value;
   
    console.log("search event",this.checkLength);
    
    if (this.checkLength.length > 2) {

      this.url = environment.main_url +  "banners?is_admin=1&search=" + event.target.value;
      this.getBannerList(this.url);

    } else {
      this.url = environment.main_url  + "banners?" + "size=1000&is_admin=1";
      // this.url = environment.main_url + "category/" + this.categoryId + "/banners";
      this.getBannerList(this.url);
    }

  }

  viewDetail(item){
    console.log("show advertisement detail:"+JSON.stringify(item));

    let send_data = {};
    send_data['type'] = "Banner";
    send_data['image'] = item.image;
    send_data['title'] = item.title;
    send_data['description'] = item.description;
    send_data['price'] = "";
    send_data['startDateTime'] = item.startDateTime;
    send_data['endDateTime'] = item.endDateTime;
    send_data['viewCount'] = item.view_count;

    const dialogRef = this.dialog.open(AdvertisementdetailpopupComponent, {
      width: '30%',
      panelClass: 'custom-ad-dialog-container',
      data: send_data
    });

    dialogRef.afterClosed().subscribe(async result => {
      this.url = environment.main_url  + "banners?" + "size=1000&is_admin=1";
      // this.url = environment.main_url + "category/" + this.categoryId + "/banners?page=" + this.currentPage + "&size=5";
    
      this.getBannerList(this.url);
    });
  }


  disableComponent(event) {
   
    this.url = environment.main_url +"banners/"+event.id+ "/bannersActiveInactive";
    
    this.apiCall.putWithoutData(this.url).subscribe((response)=>{
      if(event.isActive){
        this.openSnackBar("Banner disabled successfully.")
      }else{
        this.openSnackBar("Banner enabled successfully.")
      }

      this.url = environment.main_url  + "banners?" + "size=1000&is_admin=1";
      this.getBannerList(this.url);
    })
  }


  showPopup() {
    // let send_data = {};
    // send_data['status'] = "add";
    // const dialogRef = this.dialog.open(LanguagepopupComponent, {
    //   width: 'this.categoryId0%',
    //   panelClass: 'custom-dialog-container',
    //   data: send_data
    // });

    // dialogRef.afterClosed().subscribe(async result => {
    //   this.getLanguagesList();
    // });
  }

  edit(event){
    this.broadCastStatus = "update";
    this.broadCastMessage();
    console.log("show banner id for edit:"+JSON.stringify(event));
  this.router.navigate(['admin/bannerupdate', { bannerData : JSON.stringify(event)}]);
  }

  editBanner(item){
    this.broadCastStatus = "update";
    this.broadCastMessage();
    console.log("show banner date for edit:"+JSON.stringify(item));
    this.router.navigate(['admin/bannerupdate', { bannerData : JSON.stringify(item)}]);
  }

  deleteBanner(item){

    if(confirm("Are you sure to delete " +item.title +" banner ?")) {
    this.url = environment.main_url  + "banners/"+item.id;
    this.apiCall.deleteEntry(this.url).subscribe((response)=>{
      this.openSnackBar("Deleted successfully.")
      this.url = environment.main_url  + "banners?" + "size=1000&is_admin=1";
      this.getBannerList(this.url);
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

  broadCastMessage(): void {
    if(this.broadCastStatus == "add"){
      this.messageService.broadCastMessage("Add Banner");
    }else if(this.broadCastStatus == "update"){
      this.messageService.broadCastMessage("Update Banner");
    }else{
      this.messageService.broadCastMessage("Banner");
    }
 }
}
