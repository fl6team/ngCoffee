import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CupService } from '../cup.service'
import { CupInterface } from '../cup-interface';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.css']
})
export class SizeComponent implements OnInit {
  public cupSize:string;
  public coffeeCup = {};

  constructor(private route:Router, private cup:CupService) { }
  ngOnInit() {
    window.onunload = function(event) {
      window.localStorage.setItem("redirect","true");
     }
     if(window.localStorage.getItem("redirect") === "true"){
       window.localStorage.setItem("redirect","false");
       this.route.navigate([''])
     }
  }
  public confirmSize():void{
    this.cup.cupProperties.makeStepActive('baseState');
    this.cup.cupProperties.makeStepAvaliable('baseState');
    this.route.navigate(['config/base']);
  }

  public defineSize(obj:CupInterface):void{
    //** disable active state for all cups
    this.cup.cupsList.forEach(item=>{
      item.checked = false;
    })
    //**
    obj.checked = true;

    this.cup.cupProperties.size = obj;

  }


}
