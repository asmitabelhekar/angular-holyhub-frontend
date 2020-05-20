import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/services/api/api.service';
import { MatSnackBar } from '@angular/material';
import { MessageService } from 'src/app/services/messages/message.service';

@Component({
  selector: 'app-bannerupdate',
  templateUrl: './bannerupdate.component.html',
  styleUrls: ['./bannerupdate.component.css']
})
export class BannerupdateComponent implements OnInit {

  weekId = "1";
  loc: any = {};
  weekList = ['1','2','3','4','5'];
  bannerModel : any = {};

  mobileCheck : string;
  lattitude: any;
  longitude: any;
  countryName: any;
  stateName: any;
  cityName: any;
  pincode: any;
  firstImage : any;
  bannerData : any;
  categoryId: any;
  bannerId: any;
  startDateTime : any;
  endDateTime: any;

  constructor(
    public changeDetectorRef : ChangeDetectorRef,
    public activatedRoute : ActivatedRoute,
    public snackBar : MatSnackBar,
    public router : Router,
    public messageService : MessageService,
    public apiCall : ApiService
  ) { }

  ngOnInit() {
  let data = this.activatedRoute.snapshot.params['bannerData'];
  this.bannerData = JSON.parse(data);
  this.bannerModel['name'] = this.bannerData.title;
  this.bannerModel['description'] = this.bannerData.description;
  this.loc['location'] = this.bannerData.city;
  this.cityName = this.bannerData.city;
  this.firstImage = this.bannerData.image;
  this.lattitude = this.bannerData.lat;
  this.longitude = this.bannerData.lng;
  this.startDateTime = this.bannerData.startDateTime;
  this.endDateTime = this.bannerData.endDateTime;
  

  }



  handleAddressChange(data) {

    console.log("Address Data", data);

    this.lattitude = data.geometry.location.lat();
    this.longitude = data.geometry.location.lng();
    console.log("Address Data lattitude one::", this.lattitude);
    console.log("Address Data longitude one::", this.longitude);
  

    console.log("lat", this.lattitude, this.longitude);
    let string = "";
    string = data['formatted_address']
    let arr = [];
    let str = "";
    let ss = [];
    arr = string.split(",");
    for (let index = arr.length - 1; index >= 0; index--) {
      console.log(index, "data ", arr[index]);
      this.loc['landmark'] = arr[2];
      this.loc['address'] = data.vicinity;
      this.loc['location'] = data.name;
      this.countryName = arr[arr.length - 1] != null ? arr[arr.length - 1] : "";
      str = arr[arr.length - 2] != null ? arr[arr.length - 2] : "";
      let statestr = str.split(' ');
      ss = statestr;
      this.stateName = ss[1];
      this.pincode = ss[2];
      this.cityName = arr[arr.length - 3] != null ? arr[arr.length - 3] : "";
      this.changeDetectorRef.detectChanges();

    }
    console.log(this.cityName, this.stateName, this.countryName, this.pincode, this.loc['landmark'], this.loc['location']);
  }

  updateBanner(categoryId) {
    // this.loader.showBlockingLoaderAuth();
    let send_date = {};
    send_date['image'] = this.firstImage;
    send_date['title'] = this.bannerModel['name'];
    send_date['description'] = this.bannerModel['description'];
    send_date['startDateTime'] = this.bannerData.startDateTime;
    send_date['endDateTime'] = this.bannerData.endDateTime;
    send_date['lat'] = this.bannerData.lat;
    send_date['lng'] = this.bannerData.lng;
    send_date['isActive'] = 1;
    send_date['city'] = this.cityName;
    send_date['advertisementId'] = this.bannerData.advertisementId;
    send_date['userId'] = this.bannerData.userId;
    this.categoryId = this.bannerData.categoryId;
    this.bannerId = this.bannerData.id;

    // let getBannerId = localStorage.getItem("bannerId");
    let url = environment.main_url  + "category/" + this.categoryId + "/banners/" + this.bannerId;
    this.apiCall.put(url, send_date).subscribe(MyResponse => {
    this.openSnackBar("Banner Updated Successfully");
    this.messageService.broadCastMessage("Banner");
    this.router.navigate(['admin/bannerlist']);
      // this.loader.hideBlockingLoaderAuth();
    }, error => {
      // this.loader.hideBlockingLoaderAuth();
    });

  }

  openSnackBar(msg) {
    this.snackBar.open(msg, "", {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}
