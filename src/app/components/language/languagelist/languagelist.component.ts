import { Component, OnInit, Input } from '@angular/core';
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
    { "name": "Sr No", "key": "index" },
    { "name": "Language Name", "key": "name" },
    { "name": "Image", "key": "image" }
  ];
  
  currentPage = 0;
  dataArray : any = [];
  checkLength : any;
 
  pageIndex : any = 0;
  lastPage : any = 0;

  url = environment.main_url + "languages" ;


  constructor(public router : Router,
    public dialog : MatDialog,
    public messageService : MessageService,
    public apiCall : ApiService) { }

  ngOnInit() {
    this.broadCastMessage();
    this.url = environment.main_url + "languages?page=" + this.currentPage + "&size=1000";

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


  add() {
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
      this.url = environment.main_url + "languages?page=" + this.currentPage + "&size=1000";
      this.getLanguagesList(this.url);
    });
  }

  

  delete(item){

    if(confirm("Are you sure to delete " +item.name +" language ?")) {
    this.url = environment.main_url  + "languages/"+item.id;
    this.apiCall.deleteEntry(this.url).subscribe((response)=>{
     
      this.url = environment.main_url + "languages?page=" + this.currentPage + "&size=1000";
      this.getLanguagesList(this.url);
      
    })
   }

  }


  paginate(event) {
    console.log("currentPage::" +event);

    this.currentPage = event;
    this.url = environment.main_url + "languages?page=" + this.currentPage + "&size=1000";
    this.getLanguagesList(this.url);

  }

 
  search(event){

    console.log("show search event:"+JSON.stringify(event));
    this.checkLength = event.target.value;
    console.log("search event",this.checkLength);
    if (this.checkLength.length > 2) {

      this.url = environment.main_url + "languages?search=" + event.target.value;
      this.apiCall.get(this.url).subscribe((response)=>{
  
        this.dataArray = response['result']['list'];
  
      });

    } else {
      this.url = environment.main_url + "languages?page=" + this.currentPage + "&size=1000";
      this.getLanguagesList(this.url);

    }


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
      this.url = environment.main_url + "languages?page=" + this.currentPage + "&size=1000";
      this.getLanguagesList(this.url);
    });
   
  }
}
