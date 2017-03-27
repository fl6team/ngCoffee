import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CupService } from '../cup.service';

@Component({
  selector: 'app-predefined',
  templateUrl: './predefined.component.html',
  styleUrls: ['./predefined.component.css']
})
export class PredefinedComponent implements OnInit {

  constructor(private router:Router, private cup:CupService) { }

  ngOnInit() {

  }

  //public componentVisibility:boolean = true;

  public configStart():void{
    this.router.navigate(['config']);
    this.cup.cupProperties.makeStepActive('sizeState');
    this.cup.cupProperties.makeStepAvaliable('sizeState');
  }



}
