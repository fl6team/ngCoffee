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

  public showMoreBtnText = "Show More";
  public showMoreOrLess = true;



  public showMoreBtn = true;
  public itemCounter = 3;
  constructor(private router:Router, private cup:CupService, private servedBaseList:IngridientsService) { }
  public showMore(){
    if(this.itemCounter + 3 <= this.coffeeList.length){
      this.itemCounter += 3;
      this.coffeeToShow = this.coffeeList.slice(0,this.itemCounter);
    } else {
      this.coffeeToShow = this.coffeeList;
      this.showMoreBtn = false;
    }
  }
  ngOnInit() {
    console.log(this.coffeeList);
    window.localStorage.setItem("redirect","false");
    this.servedBaseList.fetchCoffee().subscribe(
      (data) => {
        for(let elem in data){
          this.coffeeList.push(data[elem]);
        }
        this.showLoadder = false;
        if(this.coffeeList.length > 3){
          this.coffeeToShow = this.coffeeList.slice(0,3);
        }
      }
    );




  }


  public configStart():void{
    this.router.navigate(['config']);
    this.cup.cupProperties.makeStepActive('sizeState');
    this.cup.cupProperties.makeStepAvaliable('sizeState');
  }
  public makeOrder(obj){
    this.cup.definedCup = obj;
    this.router.navigate(['final']);
  }



}
