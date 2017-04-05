import { Component, OnInit } from '@angular/core';
import { CupService } from '../cup.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  constructor(private route:Router, public cup:CupService) { }
  public makeActiveBtn(state:string):void{
    this.cup.cupProperties.makeStepActive(state)
  }
  public goHome(){
    this.route.navigate([''])
  }
  public reset(){
    this.cup.refreshCups();
    this.route.navigate(['config/size']);
    this.cup.cupProperties.makeStepActive('sizeState');
    this.cup.cupProperties.makeStepAvaliable('sizeState');
  }
  ngOnInit() { }

}
