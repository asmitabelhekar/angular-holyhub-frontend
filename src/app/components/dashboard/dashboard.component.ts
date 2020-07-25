import { Component, OnInit } from '@angular/core';
import { ApiService } from '../..//services/api/api.service';
import { environment } from '../../../environments/environment';
import { MessageService } from 'src/app/services/messages/message.service';
import { Router } from '@angular/router';
import { SidemenuComponent } from '../sidemenu/sidemenu.component';
import { Subscription } from 'rxjs';
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
  subscription: Subscription;
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

  allData = [
  {
		"title": "Advertisement",
		"count": "40",
		"image": "http://d3lgrseqpnv6xt.cloudfront.net/1594457506982.jpg",
		
	},
	{
		"title": "User",
		"count": "30",
		"image": "http://d3lgrseqpnv6xt.cloudfront.net/1594457559111.png",
	
	},
	{
		"title": "Banner",
		"count": "10",
		"image": "http://d3lgrseqpnv6xt.cloudfront.net/1594457610455.jpg",
	
	},

	{
		"title": "Payment Logs",
		"count": "10",
		"image": "http://d3lgrseqpnv6xt.cloudfront.net/1594457654648.jpg",
	
	}

]


  url = environment.main_url ;

  constructor(
    public apiCall: ApiService,
    public messageService : MessageService,
    public sideMenu : SidemenuComponent,
    public router : Router
  ) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.totalCount
    };
  }

  ngOnInit() {
    this.broadCastMessage();

    // /api/v1.0.0/admin/dashboard

    // let url = this.url + "customers?page=" + this.currentPage + "&size=10";

    // this.getList(url);

    let url = this.url + "admin/dashboard";

    this.getDashboardStatus(url);

    this.subscription = this.messageService.retriveMessage().subscribe(message => {
      if (message) {
        console.log("show retrived msg:" + JSON.stringify(message));
        this.title = message['text'];
        console.log("show dashboard changes title inside :" + this.title);

        // this.chat.push(message);
      } else {
        // clear messages when empty message received
        // this.chat = [];
      }
    });

  }


  broadCastMessage(): void {
    this.messageService.broadCastMessage("Dashboard");
 }

  // getList(url) {

  //   this.apiCall.get(url).subscribe((response) => {

  //     console.log("response", response);

  //     // this.dataArray = response['result']['list'];
  //     // this.totalCount = response['result']['count'];


  //   })

  // }

  getDashboardStatus(url){

    this.apiCall.getAd(url).subscribe((response)=>{

      this.allData = response['result'];

      // let temp =   {
      //   "title": "Inactive Advertise",
      //   "count": "7",
      //   "image": "http://d3lgrseqpnv6xt.cloudfront.net/1594457654648.jpg",
      //   "is_success": "0",
      //   "is_failure": "7"
      // };

      // let temp2 =   {
      //   "title": "Inactive Banners",
      //   "count": "7",
      //   "image": "http://d3lgrseqpnv6xt.cloudfront.net/1594457654648.jpg",
      //   "is_success": "0",
      //   "is_failure": "7"
      // }
      // this.allData.push(temp);
      // this.allData.push(temp2);


      // this.totalCount = response['result']['count'];
      // this.lastPage = Math.ceil(this.totalCount / 5);
    })
  }

  

  redirectToDetails(item){

    console.log("my pos",""+JSON.stringify(item));

    switch(item.title){

      case "Advertisement":     
      this.sideMenu.activeIndex(1,item.title);
      this.router.navigate(['/admin/advertisementlist']);
      break;

      case "User":    
      this.sideMenu.activeIndex(6,item.title); 
      this.router.navigate(['/admin/userlist']);
      break;

      case "Banner":   
      this.sideMenu.activeIndex(2,item.title);   
      this.router.navigate(['/admin/bannerlist']);
      break;

      case "Payment Logs":  
      this.sideMenu.activeIndex(6,item.title);     
      this.router.navigate(['/admin/paymentlogs']);
      break;

      case "Inactive Advertise":  
      this.sideMenu.activeIndex(7,item.title);     
      this.router.navigate(['/admin/inactiveadvertiselist']);
      break;


      case "Inactive Banners":  
      this.sideMenu.activeIndex(8,item.title);     
      this.router.navigate(['/admin/inactivebannerlist']);
      break;


    //   {path:'inactivebannerlist',component:InactivebannerlistComponent},

    // {path:'inactiveadvertiselist',component:InactiveadvertiselistComponent}




    }


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
