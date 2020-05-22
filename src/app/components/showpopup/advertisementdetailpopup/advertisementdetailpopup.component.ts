import { Component, OnInit, Inject, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { CategorylistComponent } from '../../category/categorylist/categorylist.component';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { AdvertisementlistComponent } from '../../advertisement/advertisementlist/advertisementlist.component';
@Component({
  selector: 'app-advertisementdetailpopup',
  templateUrl: './advertisementdetailpopup.component.html',
  styleUrls: ['./advertisementdetailpopup.component.css']
})
export class AdvertisementdetailpopupComponent implements OnInit {

  type : any;
  image: any;
  title: any;
  description: any;
  price: any;
  getAdvertisementDetail: any;

  constructor(
    public dialogRef: MatDialogRef<AdvertisementlistComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public changeDetectorRef: ChangeDetectorRef,
    public snackbar: MatSnackBar,
    public apiCall: ApiService,
    public router: Router
  ) { }


  ngOnInit() {
    this.type = this.data.type;
    this.title= this.data.title;
    this.description= this.data.description;
    this.image= this.data.image;
    this.price= this.data.price;

  }

  closeDialog(){
    this.dialogRef.close();
  }

}
