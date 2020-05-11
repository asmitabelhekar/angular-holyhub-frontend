import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';

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
    public apiCall : ApiService) { }

  ngOnInit() {
    this.getCategoryList();
  }

  getCategoryList(){

    this.apiCall.get(this.url).subscribe((response)=>{

      this.dataArray = response['result']['list'];
      this.totalCount = response['result']['count'];
      this.lastPage = Math.ceil(this.totalCount / 10);
    })
  }


  add(event){

    console.log("delete event",event);
    this.router.navigate(['admin/addlanguage']);
  }
}
