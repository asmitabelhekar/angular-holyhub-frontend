import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material';
import { LanguagepopupComponent } from '../../showpopup/languagepopup/languagepopup.component';

@Component({
  selector: 'app-languagelist',
  templateUrl: './languagelist.component.html',
  styleUrls: ['./languagelist.component.css']
})
export class LanguagelistComponent implements OnInit {

 

  config : any;
  totalCount = 0;
  columnArray: any = [
    // { "name": "No", "key": "id" },
    { "name": "Language Name", "key": "name" },
    { "name": "Image", "key": "image" }
  ];
  
  currentPage = 0;
  dataArray : any = [];
 
  pageIndex : any = 0;
  lastPage : any = 0;

  url = environment.main_url + "languages" ;


  constructor(public router : Router,
    public dialog : MatDialog,
    public apiCall : ApiService) { }

  ngOnInit() {
    this.getLanguagesList();
  }

  getLanguagesList(){

    this.apiCall.get(this.url).subscribe((response)=>{

      this.dataArray = response['result']['list'];
      this.totalCount = response['result']['count'];
      this.lastPage = Math.ceil(this.totalCount / 10);
    })
  }


  add(event) {
    this.showPopup();
    // console.log("delete event",event);
    // this.router.navigate(['admin/addcategory']);
  }

  showPopup() {
    let send_data = {};
    send_data['status'] = "add";
    const dialogRef = this.dialog.open(LanguagepopupComponent, {
      width: '40%',
      panelClass: 'custom-dialog-container',
      data: send_data
    });

    dialogRef.afterClosed().subscribe(async result => {
      this.getLanguagesList();
    });
  }

  edit(event){
    console.log("show edit event:"+JSON.stringify(event));

    let send_data = {};
    send_data['status'] = "update";
    send_data['id'] = event.id;
    send_data['name'] = event.name;
    send_data['image'] = event.image;
    
    const dialogRef = this.dialog.open(LanguagepopupComponent, {
      width: '35%',
      panelClass: 'custom-dialog-container',
      data: send_data
    });

    dialogRef.afterClosed().subscribe(async result => {
      this.getLanguagesList();
    });
   
  }
}
