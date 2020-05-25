import { Component, OnInit } from '@angular/core';
import { ApiService } from '../..//services/api/api.service';
import { environment } from '../../../environments/environment';
import { MessageService } from 'src/app/services/messages/message.service';

export interface Element {
  firstName: string;
  email: number;
  mobile: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public labels: any = {
    previousLabel: '',
    nextLabel: '',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
  };
  config: any;
  totalCount = 0;
  columnArray: any = [
    { "name": "Name", "key": "position" },
    { "name": "Weight", "key": "weight" },
    { "name": "Symbol", "key": "symbol" }
  ]

  currentPage = 0;
 


  title = '';
  type = 'PieChart';
  data = [
    ['Prod 1', 45.0],
    ['Prod 2', 26.8],
    ['Prod 3', 12.8],
    ['Prod 4', 8.5],
    ['Prod 5', 6.2],
    ['Others', 0.7]
  ];
  columnNames = ['Product Name', 'Percentage'];
  options = {
  };
  width = 250;
  height = 150;


  url = environment.base_url + environment.version;

  constructor(
    public apiCall: ApiService,
    public messageService : MessageService
  ) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.totalCount
    };
  }

  ngOnInit() {
    this.broadCastMessage();
    let url = this.url + "customers?page=" + this.currentPage + "&size=10";

    this.getList(url);

  }


  broadCastMessage(): void {
    this.messageService.broadCastMessage("Dashboard");
 }

  getList(url) {

    this.apiCall.get(url).subscribe((response) => {

      console.log("response", response);

      // this.dataArray = response['result']['list'];
      // this.totalCount = response['result']['count'];


    })

  }

  edit(event) {

    console.log("edit event", event);

  }


  view(event) {

    console.log("view event", event);

  }

  delete(event) {

    console.log("delete event", event);


  }

}
