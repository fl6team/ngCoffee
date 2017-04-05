import { Component, OnInit } from '@angular/core';
import { IngridientInterface } from '../ingridient-interface';
import { IngridientsService } from '../ingridients.service';
import { CupService } from '../cup.service';
import { Router } from '@angular/router';
declare var firebase: any;
import { DialogService } from "ng2-bootstrap-modal";
import { SuccessModalComponent } from '../success-modal/success-modal.component';
@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.css']
})
export class FinalComponent implements OnInit {

  constructor(private dialogService:DialogService,private route:Router,private servedBaseList:IngridientsService, private cup:CupService) {  }

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
  public goHome(){
    this.route.navigate(['']);
  }
  public countPrice():number{
    let sum:number = 0;
    if(this.cup.definedCup.adds){
      this.cup.definedCup.adds.forEach(item=>{
        sum+=Math.floor(item.price * this.cup.definedCup.size.ml/250);
      })
    }
    return sum + Math.floor(this.cup.definedCup.base.price * this.cup.definedCup.size.ml/250);
  }
  public countIngredientPrice(obj:IngridientInterface):number{
    return Math.floor(obj.price * this.cup.definedCup.size.ml/250);
  }
  public getTotalKkal():number{
    let sum:number = 0;
    if(this.cup.definedCup.adds){
      this.cup.definedCup.adds.forEach( elem =>{
          sum += elem.kkal;
      });
    }
    return sum + this.cup.definedCup.base.kkal + this.cup.definedCup.sugar.kkal;
  }
  public showConfirm() {
    let disposable = this.dialogService.addDialog(SuccessModalComponent, {});

    disposable.subscribe((isConfirmed)=>{
      this.route.navigate([''])
    });
  }

}
