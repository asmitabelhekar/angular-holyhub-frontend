import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,

  ) { }


  //GET

  public get(url) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    console.log(url);
    return this.http.get(url, httpOptions);
  }


  public getAd(url) {
    let auth_token = localStorage.getItem("authToken");

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNzYmVsaGVrYXJAZ21haWwuY29tIiwibW9iaWxlIjoiOTUyNzkwMjYyMiIsImlkIjo0NCwiaWF0IjoxNTkzMDA2OTcyfQ.C9eWtZj19K66JihcU1Kji88oYEUSrSlpgVP6DOHdudM"
      })
    }
    console.log(url);
    return this.http.get(url, httpOptions);
  }



  //POST
  public post(url, data) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization':'Token' + " " +auth_token
      })
    }
    console.log(url);

    return this.http.post(url, data, httpOptions);
  }


  //PUT

  public put(url, data) {

    console.log(url);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization':'Token' + " " +auth_token
      })
    }
    return this.http.put(url, data, httpOptions);
  }



  public delete(url, data) {

    console.log(url);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization':'Token' + " " +auth_token
      })
    }

    return this.http.delete(url, data);
  }

  public deleteEntry(url) {

    console.log(url);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization':'Token' + " " +auth_token
      })
    }

    return this.http.delete(url);
  }



  //Image Upload Post
  callPostApiForImage(url: string, data: any) {
    let formData: FormData = new FormData();
    formData.append('image', data);
    // formData.append('isSaveToLocal', 'false');
    // console.log("url", url,data,options);
    return this.http.post(url, formData)
  }




}
