import { Component, OnInit } from '@angular/core';
import { ApiService } from '../..//services/api/api.service';
import { environment } from '../../../environments/environment';

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
  dataArray: any = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  ];


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
    public apiCall: ApiService
  ) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.totalCount
    };
  }

  ngOnInit() {

    let url = this.url + "customers?page=" + this.currentPage + "&size=10";

    this.getList(url);

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
