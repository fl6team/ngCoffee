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
  public coffeeList = [];
  public choosenIngredients:IngridientInterface[] = [];
  public messageState:boolean = false;
  public sameCoffee;
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
      this.messageState = false;
    });
    dragulaService.removeModel.subscribe((value) => {
      this.onRemoveModel(value.slice(1));
    });
  }
  public checkAddsSimilarity(cup, definedCupAdds){
    if( cup.adds === undefined && definedCupAdds.length === 0 ){
      return true;
    }
    if( cup.adds !== undefined && definedCupAdds.length === 0){
      return false;
    }
    if( cup.adds === undefined && definedCupAdds.length !== 0){
      return false;
    }
    if(cup.adds.length!==definedCupAdds.length){
      return false;
    }
    let array = [];
    definedCupAdds.forEach(item=>{
      array.push(item.name);
    })
    array.reverse();
    for(let i = 0; i < cup.adds.length; i++){
      if(cup.adds[i].name !== array[i]){
        return false;
      }
    }
    return true;
  }
  public checkIfCupExist(){
    let similarity:boolean = false;
    let sameCoffee = {};
    console.log(this.coffeeList)
    console.log(this.cup.definedCup)
    this.coffeeList.forEach(item=>{
      if(item.size.size === this.cup.definedCup.size.size
      && item.base.name === this.cup.definedCup.base.name
      && item.sugar.amount === this.cup.definedCup.sugar.amount
      && this.checkAddsSimilarity(item, this.cup.definedCup.adds)){
        similarity = true;
        sameCoffee = item;
      }
    });
    if(similarity){
      return sameCoffee;
    }
  }
  public orderSame(){
    this.cup.definedCup = this.sameCoffee;
    this.route.navigate(['final']);
    this.messageState = false;
  }
  public showConfirm() {

    if(this.checkIfCupExist()){
      this.sameCoffee = this.checkIfCupExist();
      this.messageState = true;
      return;
    }

    let disposable = this.dialogService.addDialog(SubmitModalComponent, {});
    disposable.subscribe((isConfirmed)=>{
      if(!isConfirmed){
        return;
      }
      this.cup.definedCup.name = isConfirmed;
      this.cup.definedCup.adds.reverse()

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
    if(this.cup.definedCup.adds){
      this.cup.definedCup.adds.forEach(item=>{
        sum+=item.kkal;
      })
    }
    return sum + this.cup.definedCup.base.kkal + this.cup.definedCup.sugar.kkal;
  }
  public countPrice():number{
    let sum:number = 0;
    if(this.cup.definedCup.adds){
      this.cup.definedCup.adds.forEach(item=>{
        sum+=Math.floor(item.price * this.cup.cupProperties.size.ml/250);
      })
    }

    return sum + Math.floor(this.cup.definedCup.base.price * this.cup.cupProperties.size.ml/250);

  }
  public countIngredientPrice(obj:IngridientInterface):number{
    return Math.floor(obj.price * this.cup.cupProperties.size.ml/250);
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
    this.messageState = false;
  }
  ngOnInit() {

    if(this.cup.definedCup.adds === undefined){
      this.cup.definedCup.adds = [];
    }

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
    if(this.cup.definedCup.adds){
      this.cup.definedCup.adds.length = 0;
    }


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

    this.servedBaseList.fetchCoffee().subscribe(
      (data) => {
        for(let elem in data){
          this.coffeeList.push(data[elem]);
        }
      }
    );



  }
}
