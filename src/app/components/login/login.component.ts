import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/services/api/api.service';
import { SimpleSnackBar, MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  login = {
    username: '',
    password: ''
  };
  errorMessage: any;
  formControl = {
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  };
  constructor(
    public router : Router,
    public apiCall : ApiService,
    public snackbar : MatSnackBar
  ) { }

  ngOnInit() {
  }

  loginUser(){

    let send_data = {};
    send_data['mobile']= this.login.username;
    send_data['password'] = this.login.password;

    let url = environment.main_url + "users/login";
    this.apiCall.post(url, send_data).subscribe(MyResponse => {
    
      if(MyResponse['result']['userRole'] == 1){
        localStorage.setItem("authToken",MyResponse['result']['token']);
        this.openSnackBar("Login successfully");
        this.router.navigate(['admin/dashboard']);
      }else{
        this.openSnackBar("Something went wrong.");
      }

    }, error => {
    
      this.openSnackBar("Something went wrong.");
    });

    // this.route.navigate(['admin/dashboard'])

  }

  openSnackBar(msg) {
    this.snackbar.open(msg, "", {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

}
