import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-advertisementlist',
  templateUrl: './advertisementlist.component.html',
  styleUrls: ['./advertisementlist.component.css']
})
export class AdvertisementlistComponent implements OnInit {


  config : any;
  totalCount = 0;
  columnArray: any = [
    // { "name": "No", "key": "id" },
    { "name": "Image", "key": "images" },
    { "name": "Name", "key": "title" },
    { "name": "Description", "key": "description" },
    { "name": "Address", "key": "address" },
    
  ];
  
  currentPage = 0;
  dataArray : any = [];
  checkLength : any;
  pageIndex : any = 0;
  lastPage : any = 0;

  url : any; ;


  constructor(public router : Router,
    public dialog : MatDialog,
    public apiCall : ApiService) { }

  ngOnInit() {
    this.url = environment.main_url + "categories/" + 4 + "/advertisements?page=" + this.currentPage + "&size=10";
    this.getAdvertisementList(this.url);
  }

  getAdvertisementList(url){

    this.apiCall.get(url).subscribe((response)=>{

      this.dataArray = response['result']['list'];
      this.totalCount = response['result']['count'];
      this.lastPage = Math.ceil(this.totalCount / 10);
    })
  }

  paginate(event) {
    console.log("currentPage::" +event);

    this.currentPage = event;

    this.url = environment.main_url + "categories/" + 4 + "/advertisements?page=" + this.currentPage + "&size=10";

    this.getAdvertisementList(this.url);

  }


  add(event) {
    this.showPopup();
    // console.log("delete event",event);
    // this.router.navigate(['admin/addcategory']);
  }


  search(event) {
    this.checkLength = event.target.value;
    console.log("search event",this.checkLength);
    if (this.checkLength.length > 2) {
    this.url = environment.main_url + "categories/" + 4 + "/advertisements?search=" + event.target.value;

      this.getAdvertisementList(this.url);
    } else {
      this.url = environment.main_url + "categories/" + 4 + "/advertisements";
      this.getAdvertisementList(this.url);
    }

  }

  showPopup() {
    // let send_data = {};
    // send_data['status'] = "add";
    // const dialogRef = this.dialog.open(LanguagepopupComponent, {
    //   width: '40%',
    //   panelClass: 'custom-dialog-container',
    //   data: send_data
    // });

    // dialogRef.afterClosed().subscribe(async result => {
    //   this.getLanguagesList();
    // });
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
}
