import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material';
import { PopupComponent } from '../../showpopup/popup/popup.component';

@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.component.html',
  styleUrls: ['./categorylist.component.css']
})
export class CategorylistComponent implements OnInit {


  config: any;
  totalCount = 0;
  columnArray: any = [
    { "name": "Category Name", "key": "name" },
    { "name": "Image", "key": "image" }

  ];

  currentPage = 0;
  dataArray: any = [];

  pageIndex: any = 0;
  lastPage: any = 0;

  url;


  constructor(public router: Router,
    public dialog: MatDialog,
    public apiCall: ApiService) { }

  ngOnInit() {
    this.url = environment.main_url + "category/" + 0 + "/sub-category?page=" + this.currentPage + "&size=5";
    this.getCategoryList(this.url);
  }

  getCategoryList(url) {

    this.apiCall.get(this.url).subscribe((response) => {

      this.dataArray = response['result']['list'];
      this.totalCount = response['result']['count'];
      this.lastPage = Math.ceil(this.totalCount / 5);
    })
  }
  ngOnChanges() {
    this.url = environment.main_url + "category/" + 0 + "/sub-category?page=" + this.currentPage + "&size=5";
    this.getCategoryList(this.url);
  }

  add(event) {
    this.showPopup();
    // console.log("delete event",event);
    // this.router.navigate(['admin/addcategory']);
  }



  paginate(event) {
    console.log("currentPage::" +event);

    this.currentPage = event;

    this.url = environment.main_url + "category/" + 0 + "/sub-category?page=" + this.currentPage + "&size=5";

    this.getCategoryList(this.url);

  }


  showPopup() {
    let send_data = {};
    send_data['status'] = "add";
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '25%',
      panelClass: 'custom-dialog-container',
      data: send_data
    });

    dialogRef.afterClosed().subscribe(async result => {
    this.url = environment.main_url + "category/" + 0 + "/sub-category?page=" + this.currentPage + "&size=5";
      this.getCategoryList(this.url);
    });
  }

  edit(event){
    console.log("show edit event:"+JSON.stringify(event));

    let send_data = {};
    send_data['status'] = "update";
    send_data['id'] = event.id;
    send_data['name'] = event.name;
    send_data['image'] = event.image;
    
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '25%',
      panelClass: 'custom-dialog-container',
      data: send_data
    });

    dialogRef.afterClosed().subscribe(async result => {
    this.url = environment.main_url + "category/" + 0 + "/sub-category?page=" + this.currentPage + "&size=5";
      this.getCategoryList(this.url);
    });
   
  }
}
