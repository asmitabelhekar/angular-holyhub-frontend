import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  checkLength : any;
  config : any;
  totalCount = 0;
  columnArray: any = [
    { "name": "Name", "key": "name" },
    { "name": "Mobile", "key": "mobile" },
    { "name": "Email", "key": "email" }
  ];
  
  currentPage = 0;
  dataArray : any = [];
 
  pageIndex : any = 0;
  lastPage : any = 0;

  url : any ;

  constructor(public router : Router,
    public apiCall : ApiService) { }

  ngOnInit() {
    this.url = environment.main_url + "users?page=" + this.currentPage + "&size=10";
    this.getUsersList(this.url);
  }

  getUsersList(url){

    this.apiCall.get(url).subscribe((response)=>{

      this.dataArray = response['result']['list'];
      this.totalCount = response['result']['count'];
      this.lastPage = Math.ceil(this.totalCount / 10);
    })
  }

  paginate(event) {
    console.log("currentPage::" +event);

    this.currentPage = event;

    this.url = environment.main_url + "users?page=" + this.currentPage + "&size=10";
    this.getUsersList(this.url);

  }

  add(event){

    console.log("delete event",event);
    // this.router.navigate(['admin/addlanguage']);
  }


  search(event) {
    this.checkLength = event.target.value;
    console.log("search event",this.checkLength);
    if (this.checkLength.length > 2) {
      this.url = environment.main_url +  "users?search=" + event.target.value;
      this.getUsersList(this.url);
    } else {
      this.url = environment.main_url + "users";
      this.getUsersList(this.url);
    }

  }
}
