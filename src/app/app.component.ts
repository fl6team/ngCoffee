import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public users = [];
  public currUser;
  constructor(private route:Router){
    this.currUser = {name:window.localStorage.getItem("userName") || "guest", isAdmin:window.localStorage.getItem("isAdmin") === "true" || false};
    this.users.push({name:"Thomas", isAdmin: false});
    this.users.push({name:"Richard", isAdmin: false});
    this.users.push({name:"Abraham", isAdmin: true});
   }

  public onChange(user){
    this.currUser = this.getUserByName(user);
    window.localStorage.setItem("userName", this.currUser.name);
    window.localStorage.setItem("isAdmin", this.currUser.isAdmin);
    this.route.navigate(['']);
  }
  public getUserByName(name){
    for(let u of this.users){
      if(u.name == name) return u;
    }
  }
  ngOnInit(){
    console.log(this.currUser);
  }
}
