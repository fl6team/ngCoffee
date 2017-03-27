import { Component, OnInit } from '@angular/core';
import { IngridientInterface } from '../ingridient-interface';
import { IngridientsService } from '../ingridients.service';
import { CupService } from '../cup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adds-config',
  templateUrl: './adds-config.component.html',
  styleUrls: ['./adds-config.component.css']
})
export class AddsConfigComponent implements OnInit {
  public addsIngridientsList:IngridientInterface[];
  constructor(private route:Router,private servedBaseList:IngridientsService, private cup:CupService) { }
  public addIngridient(obj:IngridientInterface):void{
    let ifExist:boolean = false;
    this.cup.cupProperties.adds.forEach(item=>{
      if(item.name === obj.name) ifExist=true;
    })
    if(!ifExist){
      obj.checkState = true;
      this.cup.cupProperties.adds.push(obj);
    }
  }
  public deleteComponent(obj:IngridientInterface):void{
    let removeIndex:number = 0;
    this.cup.cupProperties.adds.forEach((item, i)=>{
      if(obj.name === item.name){
        removeIndex = i;
        obj.checkState = false;
        return;
      }
    })
    this.cup.cupProperties.adds.splice(removeIndex, 1);
  }

  public confirmAdds(){
    this.route.navigate(["config/fill-in"]);
    this.cup.cupProperties.makeStepActive('fillState');
    this.cup.cupProperties.makeStepAvaliable('fillState');
  }


  public filterBy(attr:string):void{
    this.addsIngridientsList = this.servedBaseList.getIngridientsByType('adds');
    if(attr==='all'){
      return;
    }
    this.addsIngridientsList = this.addsIngridientsList.filter(item=>{
      return item.addsType === attr;
    })
  }
  ngOnInit() {
    //this.addsIngridientsList = this.servedBaseList.getIngridientsByType('adds');
    this.servedBaseList.fetchData().subscribe(
      (data) => {
        this.servedBaseList.ingridientsDataBase = data;
        this.addsIngridientsList = this.servedBaseList.ingridientsDataBase.filter(ingridient=>{
          return ingridient.type === 'adds';
        });
      }
    );
  }

}