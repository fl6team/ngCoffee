import { Component, OnInit } from '@angular/core';
import { IngridientInterface } from '../ingridient-interface';
import { SugarInterface } from '../sugar-interface'
import { IngridientsService } from '../ingridients.service';
import { CupService } from '../cup.service';
import { Router } from '@angular/router';
import {DragulaModule, DragulaService} from 'ng2-dragula/ng2-dragula';
declare var firebase: any;
import { DialogService } from "ng2-bootstrap-modal";
import { SubmitModalComponent } from '../submit-modal/submit-modal.component';

@Component({
  selector: 'app-cup-filling',
  templateUrl: './cup-filling.component.html',
  styleUrls: ['./cup-filling.component.css']
})
export class CupFillingComponent implements OnInit {
  public choosenIngredients:IngridientInterface[] = [];
  public sugarLevels:SugarInterface[] = [
    {amount:0, message:"Sugar free", state:false, kkal:0},
    {amount:1, message:"One sugar bag", state:false, kkal:10},
    {amount:2, message:"Two sugar bags", state:true, kkal:15},
    {amount:3, message:"Three sugar bags", state:false, kkal:20},
    {amount:4, message:"Four sugar bags", state:false, kkal:25}
  ];
  constructor(private dialogService:DialogService,private route:Router,private servedBaseList:IngridientsService, public cup:CupService, private dragulaService: DragulaService) {
    dragulaService.dropModel.subscribe((value) => {
      this.onDropModel(value.slice(1));
    });
    dragulaService.removeModel.subscribe((value) => {
      this.onRemoveModel(value.slice(1));
    });
  }
  public showConfirm() {
    let disposable = this.dialogService.addDialog(SubmitModalComponent, {});

    disposable.subscribe((isConfirmed)=>{
      if(!isConfirmed){
        return;
      }
      this.cup.definedCup.name = isConfirmed;
      this.cup.definedCup.adds.reverse();
      firebase.database().ref('/definedCoffee').push(this.cup.definedCup);
      this.route.navigate(['final'])
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
      item.message = '';
    })
  }

  private onDropModel(args) {
    this.refreshDisability();
    let [el, target, source] = args;
    this.choosenIngredients.forEach(item=>{
      if(100 - this.countFillState() < item.fillPercentage){
        item.disabled = true;
        item.message = 'Not enough space'
      }
      this.cup.definedCup.adds.forEach(elem=>{
        if(item.addsType === elem.addsType){
          item.disabled = true;
          item.message = `You\`ve already put ${item.addsType} add`;
        }
      })
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
    return obj.fillPercentage;
  }
  public countCalories():number{
    let sum:number = 0;
    this.cup.definedCup.adds.forEach(item=>{
      sum+=item.kkal;
    })
    return sum + this.cup.definedCup.base.kkal + this.cup.definedCup.sugar.kkal;
  }
  public countPrice():number{
    let sum:number = 0;
    this.cup.definedCup.adds.forEach(item=>{
      sum+=item.price;
    })
    return sum + this.cup.definedCup.base.price;
  }
  public log(item){
    console.log(item);
  }

  public putSugar(obj:SugarInterface):void{
    this.sugarLevels.forEach(item=>{
      item.state = false;
    })
    obj.state = true;
    this.cup.definedCup.sugar = obj;
  }
  ngOnInit() {
    window.onbeforeunload = function (){
        return "";
    };
    window.onunload = function(event) {
      window.localStorage.setItem("redirect","true");
     }
     if(window.localStorage.getItem("redirect") === "true"){
       window.localStorage.setItem("redirect","false");
       this.route.navigate([''])
     }
    this.choosenIngredients.length = 0;
    this.cup.definedCup.adds.length = 0;

    this.cup.cupProperties.adds.forEach((item)=>{
      if(!this.checkIfIn(item)){
        this.choosenIngredients.push(item);
      }
    })
    this.cup.definedCup.size = this.cup.cupProperties.size;
    this.cup.definedCup.base = this.cup.cupProperties.base;

    this.sugarLevels.forEach(item=>{
      if(item.state){
        this.cup.definedCup.sugar = item;
        return;
      }
    })
    this.refreshDisability();
  }
}
