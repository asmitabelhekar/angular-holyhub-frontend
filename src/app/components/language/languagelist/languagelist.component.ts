import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material';
import { LanguagepopupComponent } from '../../showpopup/languagepopup/languagepopup.component';
import { MessageService } from 'src/app/services/messages/message.service';

@Component({
  selector: 'app-languagelist',
  templateUrl: './languagelist.component.html',
  styleUrls: ['./languagelist.component.css']
})
export class LanguagelistComponent implements OnInit {

 

  config : any;
  totalCount = 0;
  columnArray: any = [
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
    public messageService : MessageService,
    public apiCall : ApiService) { }

  ngOnInit() {
    this.url = environment.main_url + "languages?page=" + this.currentPage + "&size=5";

    this.getLanguagesList(this.url);

  }



  broadCastMessage(): void {
    this.messageService.broadCastMessage("Language");
 }

  getLanguagesList(url){

    this.apiCall.get(url).subscribe((response)=>{

      this.dataArray = response['result']['list'];
      this.totalCount = response['result']['count'];
      this.lastPage = Math.ceil(this.totalCount / 5);
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
      width: '25%',
      panelClass: 'custom-dialog-container',
      data: send_data
    });

    dialogRef.afterClosed().subscribe(async result => {
      this.url = environment.main_url + "languages?page=" + this.currentPage + "&size=5";
      this.getLanguagesList(this.url);
    });
  }


  paginate(event) {
    console.log("currentPage::" +event);

    this.currentPage = event;
    this.url = environment.main_url + "languages?page=" + this.currentPage + "&size=5";
    this.getLanguagesList(this.url);

  }

  edit(event){
    console.log("show edit event:"+JSON.stringify(event));

    let send_data = {};
    send_data['status'] = "update";
    send_data['id'] = event.id;
    send_data['name'] = event.name;
    send_data['image'] = event.image;
    
    const dialogRef = this.dialog.open(LanguagepopupComponent, {
      width: '25%',
      panelClass: 'custom-dialog-container',
      data: send_data
    });

    dialogRef.afterClosed().subscribe(async result => {
      this.url = environment.main_url + "languages?page=" + this.currentPage + "&size=5";
      this.getLanguagesList(this.url);
    });
   
  }
}
