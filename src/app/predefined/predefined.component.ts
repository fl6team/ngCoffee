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
  public coffeeList = [];
  public coffeeToShow = [];
  constructor(private router:Router, private cup:CupService, private servedBaseList:IngridientsService) { }
  public showMore(){
    this.coffeeToShow.length = this.coffeeList.length;
    this.coffeeToShow = this.coffeeList;
  }
  ngOnInit() {


    window.localStorage.setItem("redirect","false");
    this.servedBaseList.fetchCoffee().subscribe(
      (data) => {
        // console.log(data);
        for(let elem in data){
          this.coffeeList.push(data[elem]);
        }
      }
    );



    //WTF!!!!!
    // for(let key in this.coffeeList){
    //   console.log('Elem:')
    //   console.log(this.coffeeList[key])
    // }
    //console.log(this.coffeeList)
    //console.log(this.coffeeList.length)
  }

  //public componentVisibility:boolean = true;

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
