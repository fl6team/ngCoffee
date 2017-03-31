import { Component, OnInit } from '@angular/core';
import { CupService } from '../cup.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  constructor(private route:Router, private cup:CupService) { }
  public makeActiveBtn(state:string):void{
    this.cup.cupProperties.makeStepActive(state)
  }

  ngOnInit() {
    // window.onunload = function(event) {
    //   window.localStorage.setItem("redirect","true");
    //  }
    //  if(window.localStorage.getItem("redirect") === "true"){
    //    window.localStorage.setItem("redirect","false");
    //    this.route.navigate([''])
    //  }
  }

}
