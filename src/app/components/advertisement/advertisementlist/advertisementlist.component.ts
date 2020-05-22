import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material';
import { AdvertisementdetailpopupComponent } from '../../showpopup/advertisementdetailpopup/advertisementdetailpopup.component';

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
  categoryId = "1";


  url : any; ;


  constructor(public router : Router,
    public dialog : MatDialog,
    public apiCall : ApiService) { }

  ngOnInit() {
    this.url = environment.main_url + "categories/" + this.categoryId + "/advertisements?page=" + this.currentPage + "&size=5";
    this.getAdvertisementList(this.url);
  }

  getAdvertisementList(url){

    this.apiCall.get(url).subscribe((response)=>{

      this.dataArray = response['result']['list'];
      this.totalCount = response['result']['count'];
      this.lastPage = Math.ceil(this.totalCount / 5);
    })
  }

  paginate(event) {
    console.log("currentPage::" +event);

    this.currentPage = event;

    this.url = environment.main_url + "categories/" + this.categoryId + "/advertisements?page=" + this.currentPage + "&size=5";

    this.getAdvertisementList(this.url);

  }


  add(event) {
    this.router.navigate(['/']);
    // this.showPopup();
  }

  filter(event) {
  console.log("show filter data:"+event);
    this.categoryId = event;
    this.url = environment.main_url + "categories/" + this.categoryId + "/advertisements?page=" + this.currentPage + "&size=5";
    this.getAdvertisementList(this.url);
  }


  search(event) {
    this.checkLength = event.target.value;
    console.log("search event",this.checkLength);
    if (this.checkLength.length > 2) {
    this.url = environment.main_url + "categories/" + this.categoryId + "/advertisements?search=" + event.target.value;

      this.getAdvertisementList(this.url);
    } else {
      this.url = environment.main_url + "categories/" + this.categoryId + "/advertisements";
      this.getAdvertisementList(this.url);
    }

  }

  viewDetail(item){
    console.log("show advertisement detail:"+JSON.stringify(item));

    let send_data = {};
    send_data['image'] = item.images[0];
    send_data['title'] = item.title;
    send_data['description'] = item.description;
    send_data['price'] = item.price;

    const dialogRef = this.dialog.open(AdvertisementdetailpopupComponent, {
      width: '30%',
      panelClass: 'custom-ad-dialog-container',
      data: send_data
    });

    dialogRef.afterClosed().subscribe(async result => {
      this.url = environment.main_url + "categories/" + this.categoryId + "/advertisements?page=" + this.currentPage + "&size=5";
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
}
