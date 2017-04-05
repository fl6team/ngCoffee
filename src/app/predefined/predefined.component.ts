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
  public showLoadder = true;
  public coffeeList = [];
  public coffeeToShow = [];
  public filter = "";
  public isFiltered = false;
  public noItems = false;
  public filteredList = [];
  public showMoreBtn = true;
  public itemCounter = 3;
  constructor(private router:Router, private cup:CupService, private servedBaseList:IngridientsService) { }

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
    this.itemCounter = 3;
    this.coffeeToShow = this.filteredList.slice(0, this.itemCounter);
    if(this.filteredList.length <= 3) {
      this.showMoreBtn = false;
    }
    if(this.filteredList.length < 1) {
      this.noItems = true;
    }
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
  }
  ngOnInit() {
    window.localStorage.setItem("redirect","false");
    this.servedBaseList.fetchCoffee().subscribe(
      (data) => {
        for(let elem in data){
          this.coffeeList.push(data[elem]);
        }
        this.showLoadder = false;
        if(this.coffeeList.length > 3){
          this.coffeeToShow = this.coffeeList.slice(0,3);
        } else {
          this.coffeeToShow = this.coffeeList;
          this.showMoreBtn = false;
        }
      }
    );




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
