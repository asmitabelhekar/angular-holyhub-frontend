import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private subject = new Subject();
  constructor() { }


  broadCastMessage(message: string) {
    this.subject.next({ text: message });
}

removeMessages() {
    this.subject.next();
}

retriveMessage() {
    return this.subject.asObservable();
}

getTitle(){

  return this.subject.asObservable();
}

setTitle(title){
  console.log("set title:"+title);
  // this.navBar.setNavBarTitle(title);
  // this.navbar.setNavBarTitle(title);
  this.subject.next({ text: title });
}

}
