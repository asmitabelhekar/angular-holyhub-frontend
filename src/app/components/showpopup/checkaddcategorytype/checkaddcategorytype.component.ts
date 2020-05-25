import { Component, OnInit, Inject, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { CategorylistComponent } from '../../category/categorylist/categorylist.component';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-checkaddcategorytype',
  templateUrl: './checkaddcategorytype.component.html',
  styleUrls: ['./checkaddcategorytype.component.css']
})
export class CheckaddcategorytypeComponent implements OnInit {


  dataArray: any;
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
  checkType = 1;



  constructor(
    public dialogRef: MatDialogRef<CategorylistComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public changeDetectorRef: ChangeDetectorRef,
    public snackbar: MatSnackBar,
    public apiCall: ApiService,
    public router: Router
  ) { }

  ngOnInit() {
    this.getCategoryList();
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


  getCategoryList() {
    let url = environment.main_url + "category/" + 0 + "/sub-category";
    this.apiCall.get(url).subscribe((response) => {

      this.dataArray = response['result']['list'];

    })
  }

  selectCategory(selectedCategory) {
    if (selectedCategory == 9) {
      console.log("selectedCategory parent category: " + selectedCategory);
      this.dialogRef.close(0);
    } else {
      console.log("selectedCategory : " + selectedCategory);
      this.dialogRef.close(selectedCategory);
    }
  }


  closeDialog() {
    this.dialogRef.close();
  }
}
