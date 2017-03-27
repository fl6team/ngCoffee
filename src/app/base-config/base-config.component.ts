import { Component, OnInit } from '@angular/core';
import { IngridientInterface } from '../ingridient-interface';
import { IngridientsService } from '../ingridients.service';
import { CupService } from '../cup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base-config',
  templateUrl: './base-config.component.html',
  styleUrls: ['./base-config.component.css']
})
export class BaseConfigComponent implements OnInit {
  public baseIngridientsList:IngridientInterface[];

  constructor(private route:Router,private servedBaseList:IngridientsService, private cup:CupService) { }
  public chooseBase(obj:IngridientInterface):void{
    this.baseIngridientsList.forEach(item=>{
      item.checkState = false;
    })
    obj.checkState = true;
    this.cup.cupProperties.base = obj;
  }
  confirmBase(){
    this.cup.cupProperties.makeStepAvaliable('addsState');
    this.cup.cupProperties.makeStepActive('addsState');
    this.route.navigate(['config/adds'])
  }
  ngOnInit() {

    // this.baseIngridientsList = this.servedBaseList.getIngridientsByType('base');
    this.servedBaseList.fetchData().subscribe(
      (data) => {
        this.baseIngridientsList = data.filter(ingridient=>{
          return ingridient.type === 'base';
        });;
          if(this.cup.cupProperties.base === undefined){
            this.cup.cupProperties.base = this.baseIngridientsList[0];
            this.cup.cupProperties.base.checkState = true;
          }
      }
    );
  }
}
