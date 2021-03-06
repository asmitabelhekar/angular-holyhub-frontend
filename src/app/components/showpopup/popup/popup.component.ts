import { Component, OnInit, Inject, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { CategorylistComponent } from '../../category/categorylist/categorylist.component';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  categoryName: any = "";
  fileToUpload: any;
  urls: any = [];
  firstImage: any = "";
  popup: any = {};
  buttonText = "ADD";
  button = "Add";

  errorMessage: any;
  formControl = {
    categoryName: new FormControl('', [Validators.required]),
  };

  constructor(
    public dialogRef: MatDialogRef<CategorylistComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public changeDetectorRef: ChangeDetectorRef,
    public snackbar: MatSnackBar,
    public apiCall: ApiService,
    public router: Router
  ) { }

  ngOnInit() {
    console.log("show status of category:" + this.data.id);
    if (this.data.status == "add") {
      this.buttonText = "ADD";
      this.button = "Add";
    } else {
      this.buttonText = "UPDATE";
      this.button = "Update";
      this.popup['categoryName'] = this.data.name;
      this.firstImage = this.data.image;
    }
  }

  updateCategory(categoryId) {
    if (this.firstImage == "") {
      this.openSnackBar("Please upload category image");
    } else {
    let send_date = {};
    send_date['name'] = this.popup['categoryName'];
    send_date['image'] = this.firstImage;
    send_date['isActive'] = 1;
    send_date['sequenceNumber'] = 0;

    let url = environment.main_url + "category/" + 0 + "/sub-category/" + categoryId;
    this.apiCall.put(url, send_date).subscribe(MyResponse => {
      this.openSnackBar("Category updated successfully.")
      this.dialogRef.close();
    }, error => {
    });
  }
  }

  detectEventGallery(event) {
    console.log(event);
    let files = event.target.files;
    console.log(files);
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
        }
        console.log(file);
        this.fileToUpload = file;
        reader.readAsDataURL(this.fileToUpload);
      }
      this.handleFirstFileInput(this.fileToUpload);
    }
    // console.log("file uploaded::"+JSON.stringify(this.fileToUpload));
  }

  handleFirstFileInput(files: FileList) {
    if (this.fileToUpload == null || this.fileToUpload == undefined) {
    }
    let url = "https://xy2y3lhble.execute-api.ap-south-1.amazonaws.com/dev";
    console.log("check url : " + url);
    this.apiCall.callPostApiForImage(url, this.fileToUpload).subscribe(
      MyResponse => {

        this.urls.push(MyResponse['result'][0])
        this.firstImage = MyResponse['result'][0];
        console.log("print url resonce:" + this.firstImage);
      }, error => {
        console.log(error);

      }

    );
  }

  closeDialog() {
    this.dialogRef.close();
  }

  addCategory() {
    if (this.firstImage == "") {
      this.openSnackBar("Please upload category image");
    } else {
      let send_data = {};

      send_data['name'] = this.categoryName;
      send_data['image'] = this.firstImage;
      send_data['isActive'] = 1;
      send_data['sequenceNumber'] = 0;

      let url = environment.main_url + "category/" + 0 + "/sub-category";
      this.apiCall.post(url, send_data).subscribe(MyResponse => {

        this.dialogRef.close();

      }, error => {

        this.openSnackBar("Something went wrong.");
      });
    }

  }

  submit() {
    if (this.buttonText == "ADD") {
      this.addCategory();
    } else {
      this.updateCategory(this.data.id);

    }



  }

  openSnackBar(msg) {
    this.snackbar.open(msg, "", {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  removeImage(){
    this.firstImage = "";
  }
}
