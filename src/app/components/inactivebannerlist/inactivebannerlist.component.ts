import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MessageService } from 'src/app/services/messages/message.service';

@Component({
  selector: 'app-inactivebannerlist',
  templateUrl: './inactivebannerlist.component.html',
  styleUrls: ['./inactivebannerlist.component.css']
})
export class InactivebannerlistComponent implements OnInit {

  checkLength : any;
  planType = [
    {
      "type": "Advertisement",
      "id": "0"
    },
    {
      "type": "Banner",
      "id": "1"
    }];
  status: any;
  popup: any = {};
  errorMessage: any;
  subscriptionId: any;
  selectedType = "Advertisement";
  formName:any;
  bannerFirstWeekPrice: any;
  bannerNextWeekPrice: any;

  addFirstWeekPrice: any;
  addNextWeekprice: any;
  planIdType: any;
  dataArray:any;
  currentPage = 0;
  url:any;
  showFilter = 0;
  showSort = 0;
  displayedColumns: any = [
    // advertisementStartDate
    { "name": "Sr No", "key": "index" },
    { "name": "Banner Name", "key": "Advertisment_Or_Banner_Name" },
    { "name": "Reason of inactivation", "key": "reason" },
    { "name": "Date", "key": "modified" }
  ];

  filterArray = [{"id":1,"name":"Advertise","parameter":"advertise"},{"id":2,"name":"Advertise + Banner","parameter":"banner+advertise"},{"id":3,"name":"Clear","parameter":"clear"}]
  sortArray = [{"id":1,"name":"Low to High","parameter":"low_to_high"},{"id":2,"name":"High to Low","parameter":"high_to_low"},{"id":3,"name":"Clear","parameter":"clear"}]

 
  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public messageService : MessageService,
    public snackbar: MatSnackBar,
    public apiCall: ApiService,
    public router: Router
  ) { }

  ngOnInit() {
    this.broadCastMessage();
    this.formName = "Inactive Banners";
    this.url = environment.main_url + "reason?&size=1000&is_advertise=0" ;

    this.getAllPaymentLogs(this.url);
    
  }


  broadCastMessage(): void {
    this.messageService.broadCastMessage("Inactive Banners");
 }


  getAllPaymentLogs(url){

   
    let send_data ;
    // send_data['status'] = "add";
    this.apiCall.get(url).subscribe((response)=>{

      this.dataArray = response['result']['list'];

    });


  }


  search(event) {
    this.checkLength = event.target.value;
    console.log("search event",this.checkLength);
    if (this.checkLength.length > 2) {

      this.url = environment.main_url + "reason?size=1000search=" + event.target.value;
      this.apiCall.get(this.url).subscribe((response)=>{
  
        this.dataArray = response['result']['list'];
  
      });

    } else {
      this.url = environment.main_url + "reason?&size=1000&is_advertise=0" ;
      this.getAllPaymentLogs(this.url);
    }

  }

  

  selectPlanType(type){
this.planIdType = type;
console.log("show type:"+type);
  }

  openSnackBar(msg) {
    this.snackbar.open(msg, "", {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  filter(event) {
    console.log("show filter data:"+event);

    // let filter = {"isAdvertisement":event.id};

    if(event.id !=2){

      let filter = {"adType" : event.parameter};

      this.url = environment.main_url + "reason?&size=1000&is_advertise=0&filters="+JSON.stringify(filter) ;
      this.getAllPaymentLogs(this.url); 
    }else{
      this.url = environment.main_url + "reason?&size=1000&is_advertise=0" ;
      this.getAllPaymentLogs(this.url);
    }
   
   }

   sort(event){

  
      this.url = environment.main_url +"reason?"+ "sort="+event.parameter+"&size=1000&is_advertise=0";

      this.getAllPaymentLogs(this.url);


   }

}
