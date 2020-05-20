import { Component, OnInit, Inject, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { CategorylistComponent } from '../../category/categorylist/categorylist.component';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { BannerupdateComponent } from '../bannerupdate/bannerupdate.component';
import { MessageService } from 'src/app/services/messages/message.service';
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
    { "name": "Image", "key": "image" },
    { "name": "Description", "key": "description" },
    { "name": "Address", "key": "city" },
    
  ];
  
  currentPage = 0;
  dataArray : any = [];
  checkLength : any;
  pageIndex : any = 0;
  lastPage : any = 0;
  categoryId = "1";
  broadCastStatus : any;

  url : any; ;


  constructor(public router : Router,
    public dialog : MatDialog,
    public messageService : MessageService,
    public apiCall : ApiService) { }

  ngOnInit() {
    this.url = environment.main_url + "category/" + this.categoryId + "/banners?page=" + this.currentPage + "&size=5";
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

    this.url = environment.main_url + "category/" + this.categoryId + "/banners?page=" + this.currentPage + "&size=5";

    this.getBannerList(this.url);

  }


  add(event) {
    // this.showPopup();
  }

  filter(event) {
  console.log("show filter data:"+event);
    this.categoryId = event;
    this.url = environment.main_url + "category/" + this.categoryId + "/banners?page=" + this.currentPage + "&size=5";
    this.getBannerList(this.url);
  }


  search(event) {
    this.checkLength = event.target.value;
    console.log("search event",this.checkLength);
    if (this.checkLength.length > 2) {
    this.url = environment.main_url + "category/" + this.categoryId + "/banners?search=" + event.target.value;

      this.getBannerList(this.url);
    } else {
      this.url = environment.main_url + "category/" + this.categoryId + "/banners";
      this.getBannerList(this.url);
    }

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

  broadCastMessage(): void {
    if(this.broadCastStatus == "add"){
      this.messageService.broadCastMessage("Add Banner");
    }else if(this.broadCastStatus == "update"){
      this.messageService.broadCastMessage("Update Banner");
    }else{
      this.messageService.broadCastMessage("Add Banner");
    }
 }
}
