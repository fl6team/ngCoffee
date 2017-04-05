import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CupService } from '../cup.service';
import { IngridientInterface } from '../ingridient-interface';
import { IngridientsService } from '../ingridients.service';
declare var firebase: any;

@Component({
  selector: 'app-predefined',
  templateUrl: './predefined.component.html',
  styleUrls: ['./predefined.component.css']
})
export class PredefinedComponent implements OnInit {
  public showLoadder:boolean = true;
  public showMoreBtn:boolean = true;
  public isFiltered:boolean = false;
  public noItems:boolean = false;
  public coffeeList = [];
  public coffeeToShow = [];
  public filteredList = [];
  public myCoffee = [];
  public lastStateOfUsers = [];
  public filter:string = "";
  public itemCounter:number = 6;
  public isMySelected = false;

  constructor(private router:Router, private cup:CupService, private servedBaseList:IngridientsService) {
  }

  public applyFilter(){
    this.noItems = false;
    if(this.coffeeToShow.length < this.coffeeList.length) {
      this.showMoreBtn = true;
    }
    if(this.filter.length > 0) {
      this.isFiltered = true;
    }
    else {
      this.isFiltered = false;
    }
    this.filteredList = this.coffeeList.filter((item)=>{
      return item.name.indexOf(this.filter) !== -1;
    });
    this.itemCounter = 6;
    this.coffeeToShow = this.filteredList.slice(0, this.itemCounter);
    if(this.filteredList.length <= 6) {
      this.showMoreBtn = false;
    }
    if(this.filteredList.length < 1) {
      this.noItems = true;
    }
    this.lastStateOfUsers = this.coffeeToShow;
  }
  public showMore(){
    if(this.isFiltered){
      if(this.itemCounter + 3 < this.filteredList.length) {
        this.itemCounter += 3;
        this.coffeeToShow = this.filteredList.slice(0,this.itemCounter);
      } else {
        this.coffeeToShow = this.filteredList;
        this.showMoreBtn = false;
      }
    } else {
      if(this.itemCounter + 3 < this.coffeeList.length) {
        this.itemCounter += 3;
        this.coffeeToShow = this.coffeeList.slice(0,this.itemCounter);
      } else {
        this.coffeeToShow = this.coffeeList;
        this.showMoreBtn = false;
      }
    }
    this.lastStateOfUsers = this.coffeeToShow;
  }
  ngOnInit() {
    window.localStorage.setItem("redirect","false");
    this.servedBaseList.fetchCoffee().subscribe(
      (data) => {
        for(let elem in data){
          let el = data[elem];
          el.key = elem;
          this.coffeeList.push(el);
        }
        this.showLoadder = false;
        if(this.coffeeList.length > 6){
          this.coffeeToShow = this.coffeeList.slice(0,6);
        } else {
          this.coffeeToShow = this.coffeeList;
          this.showMoreBtn = false;
        }
        this.lastStateOfUsers = this.coffeeToShow;
      }
    );
  }
  public isLogged(){
    return window.localStorage.getItem("nickName");
  }

  public removeCoffee(item){
    let i = this.coffeeList.indexOf(item);
    if (i > -1) {
      this.coffeeList.splice(i, 1);
    }
    i = this.coffeeToShow.indexOf(item);
    if (i > -1) {
      this.coffeeToShow.splice(i, 1);
    }
    firebase.database().ref('/definedCoffee').child(item.key).remove();
  }

  public isAdminOrOwner(item){
    return (window.localStorage.getItem("isAdmin") === "true") || (window.localStorage.getItem("nickName") === item.author);
  }

  public showMy(){
    this.isMySelected = true;
      this.myCoffee = this.coffeeList.filter((item)=>{
      return item.author === (window.localStorage.getItem("nickName") || "guest");
    });
    this.coffeeToShow = this.myCoffee;
    if(this.myCoffee.length <= 6) {
      this.showMoreBtn = false;
    }
    if(this.myCoffee.length === 0) {
      this.showMoreBtn = false;
      this.noItems = true;
    }
  }
  public showAll(){
    this.noItems = false;
    this.coffeeToShow = this.lastStateOfUsers;
    if(this.coffeeToShow.length >= 6) {
      this.showMoreBtn = true;
    }
  }

  public configStart():void{
    this.cup.refreshCups();
    this.router.navigate(['config']);
    this.cup.cupProperties.makeStepActive('sizeState');
    this.cup.cupProperties.makeStepAvaliable('sizeState');
  }
  public makeOrder(obj){
    this.cup.definedCup = obj;
    this.router.navigate(['final']);
  }
}
