import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';
import { MatDialog ,MatSnackBar} from '@angular/material';
import { PopupComponent } from '../../showpopup/popup/popup.component';
import { MessageService } from 'src/app/services/messages/message.service';
import { CheckaddcategorytypeComponent } from '../../showpopup/checkaddcategorytype/checkaddcategorytype.component';

@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.component.html',
  styleUrls: ['./categorylist.component.css']
})
export class CategorylistComponent implements OnInit {
  

  selectedCategory = 9;
  checkCategoryType = [
    {
      "name": "Parent",
      "id": "1"
    },
    {
      "name": "sub-Category",
      "id": "2"
    }
  ];
  config: any;
  totalCount = 0;
  columnArray: any = [
    { "name": "Sr No", "key": "index" },
    { "name": "Category Name", "key": "name" },
    { "name": "Image", "key": "image" }

  ];
  parentCategoryArray: any;
  currentPage = 0;
  dataArray: any = [];
  parentArray = [];
  pageIndex: any = 0;
  lastPage: any = 0;
  checkType = 1;
  checkLength : any;
  url;
  noDataFound: any;

  constructor(public router: Router,
    public dialog: MatDialog,
    public messageService: MessageService,
    public snackbar: MatSnackBar,
    public apiCall: ApiService) { }

  ngOnInit() {
    this.broadCastMessage();
    this.url = environment.main_url + "category/" + 0 + "/sub-category?page=" + this.currentPage + "&size=1000";
    this.getCategoryList(this.url);
    this.showParentCategory();
  }


  onCheckboxChange(event, item) {
    console.log("show check box changes:" + JSON.stringify(event));
    console.log("show check box changes item:" + JSON.stringify(item));
    if (item.id == 1) {
      this.checkType = 1;
    } else {
      this.checkType = 0;
    }
  }

  broadCastMessage(): void {
    this.messageService.broadCastMessage("Category");
  }

  showParentCategory() {
    let parentCategoryUrl = environment.main_url + "category/" + 0 + "/sub-category?size=1000";
    this.apiCall.get(parentCategoryUrl).subscribe((response) => {

      this.parentCategoryArray = response['result']['list'];
      this.totalCount = response['result']['count'];
      if (this.totalCount == 0) {
        this.noDataFound = 1;
      } else if (this.totalCount > 0) {
        this.noDataFound = 0;
      } else {
        // this.noDataFound = 1;
      }
    })
  }

  getCategoryList(url) {
    this.dataArray =  [];
    this.apiCall.get(this.url).subscribe((response) => {

      // this.dataArray = response['result']['list'];
      this.parentArray = response['result']['list'];
      for(let i=0; i< this.parentArray.length; i++){
        if(this.parentArray[i]['name'] == "Parent Category"){

        }else{
          this.dataArray.push(this.parentArray[i]);
        }
      }
      this.totalCount = response['result']['count'];
      if (this.totalCount == 0) {
        this.noDataFound = 1;
      } else if (this.totalCount > 0) {
        this.noDataFound = 0;
      } else {
        // this.noDataFound = 1;
      }
      // this.lastPage = Math.ceil(this.totalCount / 5);
    })
  }
  ngOnChanges() {
    this.url = environment.main_url + "category/" + 0 + "/sub-category?page=" + this.currentPage + "&size=1000";
    // this.getCategoryList(this.url);
    this.showParentCategory();
  }

  add(event) {
    // this.showPopup();
    // console.log("delete event",event);
    // this.router.navigate(['admin/addcategory']);
  }

  paginate(event) {
    console.log("currentPage::" + event);

    this.currentPage = event;

    this.url = environment.main_url + "category/" + 0 + "/sub-category?page=" + this.currentPage + "&size=1000";

    this.getCategoryList(this.url);

  }

  search(event){
    console.log("kkk",""+JSON.stringify(event));
    this.checkLength = event.target.value;
    console.log("search event",this.checkLength);
    if (this.checkLength.length > 2) {
      this.url = environment.main_url +"category/0/sub-category"+ "?size=1000&search=" + event.target.value;
      this.getCategoryList(this.url);
    } else {
      this.url = environment.main_url +"category/0/sub-category?size=1000";
      this.getCategoryList(this.url);    
    }
  }

  selectCategory(categoryId) {
    console.log("show selected parent category id:" + categoryId);
    if (categoryId == 9) {
      categoryId = 0;
    }
    this.url = environment.main_url + "category/" + categoryId + "/sub-category?page=" + this.currentPage + "&size=1000";
    this.getCategoryList(this.url);
  }


  checkAddCategoryType() {
    let send_data = {};
    send_data['status'] = "add";
    const dialogRef = this.dialog.open(CheckaddcategorytypeComponent, {

      panelClass: 'add-categorytype-custom-dialog-container',
      data: send_data
    });

    dialogRef.afterClosed().subscribe(async result => {
      console.log("show after close dialog box:" + result);
      this.showPopup();
    });
  }

  showPopup() {
    let send_data = {};
    send_data['status'] = "add";
    // send_data['id'] = id;
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '25%',
      panelClass: 'custom-dialog-container',
      data: send_data
    });

    dialogRef.afterClosed().subscribe(async result => {
      this.selectedCategory = result;
      console.log("check categoryId after popup close:"+result);

      if(result== undefined){
        result = 0;
      }
      
      this.url = environment.main_url + "category/" + result + "/sub-category?page=" + this.currentPage + "&size=1000";
      this.getCategoryList(this.url);
    });
  }

  edit(event) {
    console.log("show edit event:" + event.parentId);

    let send_data = {};
    send_data['status'] = "update";
    send_data['id'] = event.id;
    send_data['parent_id'] = event.parentId;
    send_data['name'] = event.name;
    send_data['image'] = event.image;

    const dialogRef = this.dialog.open(PopupComponent, {
      width: '25%',
      panelClass: 'custom-dialog-container',
      data: send_data
    });

    dialogRef.afterClosed().subscribe(async result => {
      if(result == undefined){
        result =0;
      }
      this.url = environment.main_url + "category/" + result + "/sub-category?page=" + this.currentPage + "&size=1000";
      this.getCategoryList(this.url);
    });

  }

  delete(item){
    if(confirm("Are you sure to delete " +item.name +" ?")) {
      console.log("Implement delete functionality here");

       // /api/v1.0.0/categories/{categoryId}/sub-categories/{id}
    this.url = environment.main_url  + "category/"+item.parentId+"/sub-category/"+item.id;
    this.apiCall.deleteEntry(this.url).subscribe((response)=>{
      this.openSnackBar("Deleted successfully.")
      this.url = environment.main_url +"category/0/sub-category?size=1000";
      this.getCategoryList(this.url);
      
    })
    }
}

openSnackBar(msg) {
  this.snackbar.open(msg, "", {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
  });
}
}
