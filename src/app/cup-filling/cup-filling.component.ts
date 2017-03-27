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
  private onDropModel(args) {
    let [el, target, source] = args;
    //console.log(this.many)

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

  ngOnInit() {
    this.choosenIngredients.length = 0;
    this.cup.definedCup.adds.length = 0;
    
    this.cup.cupProperties.adds.forEach((item)=>{
      if(!this.checkIfIn(item)){
        this.choosenIngredients.push(item);
      }
    })
    this.cup.definedCup.base = this.cup.cupProperties.base;
    console.log('Initial: ' );
    console.log(this.cup.cupProperties.adds);
    console.log('Defined: ' );
    console.log(this.cup.definedCup.adds);
    console.log('Choosen: ' );
    console.log(this.choosenIngredients);
  }

}
