import { Component, OnInit } from '@angular/core';
import { IngridientInterface } from '../ingridient-interface';
import { IngridientsService } from '../ingridients.service';
import { CupService } from '../cup.service';
import { Router } from '@angular/router';
declare var firebase: any;
@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.css']
})
export class FinalComponent implements OnInit {

  constructor(private route:Router,private servedBaseList:IngridientsService, private cup:CupService) {  }

  ngOnInit() {
    window.onbeforeunload = function (){
        return "";
    };
    window.onunload = function(event) {
      window.localStorage.setItem("redirect","true");
     }
     if(window.localStorage.getItem("redirect") === "true"){
       window.localStorage.setItem("redirect","false");
       this.route.navigate(['']);
     }
  }
  public getTotalPrice():number{
    let sum:number = 0;
    this.cup.definedCup.adds.forEach( elem =>{
        sum += elem.price;
    });
    return sum + this.cup.definedCup.base.price;;
  }
  public getTotalKkal():number{
    let sum:number = 0;
    this.cup.definedCup.adds.forEach( elem =>{
        sum += elem.kkal;
    });
    return sum + this.cup.definedCup.base.kkal + this.cup.definedCup.sugar.kkal;
  }

}
