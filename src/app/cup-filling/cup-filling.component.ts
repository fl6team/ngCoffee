import { Component, OnInit } from '@angular/core';
import { IngridientInterface } from '../ingridient-interface';
import { IngridientsService } from '../ingridients.service';
import { CupService } from '../cup.service';
import { Router } from '@angular/router';
import {DragulaModule, DragulaService} from 'ng2-dragula/ng2-dragula';

@Component({
  selector: 'app-cup-filling',
  templateUrl: './cup-filling.component.html',
  styleUrls: ['./cup-filling.component.css']
})
export class CupFillingComponent implements OnInit {
  public choosenIngredients:IngridientInterface[] = [];
  constructor(private route:Router,private servedBaseList:IngridientsService, private cup:CupService, private dragulaService: DragulaService) {
    dragulaService.dropModel.subscribe((value) => {
      this.onDropModel(value.slice(1));
    });
    dragulaService.removeModel.subscribe((value) => {
      this.onRemoveModel(value.slice(1));
    });
  }

  public countFillState():number{
    let sum:number = 0;
    this.cup.definedCup.adds.forEach(elem=>{
      sum += elem.fillPercentage;
    });
    console.log(sum);
    return sum;
  }


  //Use this function to refresh ingredient 'disabled' state to initial
  public refreshDisability():void{
    this.choosenIngredients.forEach(item=>{
      item.disabled = false;
    })
  }

  private onDropModel(args) {
    this.refreshDisability();
    let [el, target, source] = args;
    this.choosenIngredients.forEach(item=>{
      if(100 - this.countFillState() < item.fillPercentage){
        item.disabled = true;
      }
    });
  }

  private onRemoveModel(args) {
    let [el, source] = args;
    // do something else
  }
  public checkIfIn(obj:IngridientInterface):boolean{
    let ifState:boolean = false;
    this.cup.definedCup.adds.forEach(item=>{
        if(item===obj){
          ifState = true;
          return;
        }
    })

    return ifState;
  }
  public getHeight(obj:IngridientInterface){
    //console.log((obj.fillPercentage + '%'))
    return obj.fillPercentage;
  }
  public countCalories():number{
    let sum:number = 0;
    this.cup.definedCup.adds.forEach(item=>{
      sum+=item.kkal;
    })
    return sum + this.cup.definedCup.base.kkal;
  }
  public countPrice():number{
    let sum:number = 0;
    this.cup.definedCup.adds.forEach(item=>{
      sum+=item.price;
    })
    return sum + this.cup.definedCup.base.price;
  }

  ngOnInit() {
    this.choosenIngredients.length = 0;
    this.cup.definedCup.adds.length = 0;

    this.cup.cupProperties.adds.forEach((item)=>{
      if(!this.checkIfIn(item)){
        this.choosenIngredients.push(item);
      }
    })
    this.cup.definedCup.size = this.cup.cupProperties.size;
    this.cup.definedCup.base = this.cup.cupProperties.base;
    this.refreshDisability();
  }
}
