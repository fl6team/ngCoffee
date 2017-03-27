import { Component, OnInit } from '@angular/core';
import { CupService } from '../cup.service';



@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  constructor(private cup:CupService) { }
  public makeActiveBtn(state:string):void{
    this.cup.cupProperties.makeStepActive(state)
  }

  ngOnInit() {
  }

}
