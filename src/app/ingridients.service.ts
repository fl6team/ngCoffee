import { Injectable } from '@angular/core';
import { IngridientInterface } from './ingridient-interface'

@Injectable()
export class IngridientsService {
  public ingridientsDataBase = [
    {
      "type":"base",
      "name":"Instant coffee",
      "addsType":"",
      "img":"assets/img/espresso.png",
      "kkal":110,
      "checkState":false
    },
    {
      "type":"base",
      "name":"Espresso",
      "addsType":"",
      "img":"assets/img/espresso.png",
      "kkal":110,
      "checkState":false
    },
    {
      "type":"base",
      "name":"French press coffee",
      "addsType":"",
      "img":"assets/img/espresso.png",
      "kkal":110,
      "checkState":false
    },
    {
      "type":"base",
      "name":"Ground coffee",
      "addsType":"",
      "img":"assets/img/espresso.png",
      "kkal":110,
      "checkState":false
    },
    {
      "type":"base",
      "name":"Ristretto",
      "addsType":"",
      "img":"assets/img/espresso.png",
      "kkal":110,
      "checkState":false
    },
    {
      "type":"base",
      "name":"Cubano",
      "addsType":"",
      "img":"assets/img/espresso.png",
      "kkal":110,
      "checkState":false
    },
    {
      "type":"adds",
      "addsType":"syrops",
      "name":"Cherry syrop",
      "img":"assets/img/cherries.png",
      "kkal":90,
      "checkState":false
    },
    {
      "type":"adds",
      "addsType":"syrops",
      "name":"Coconut syrop",
      "img":"assets/img/coconut.png",
      "kkal":90,
      "checkState":false
    },
    {
      "type":"adds",
      "addsType":"syrops",
      "name":"Nut syrop",
      "img":"assets/img/hazelnut.png",
      "kkal":90,
      "checkState":false
    },
    {
      "type":"adds",
      "addsType":"syrops",
      "name":"Strawberry syrop",
      "img":"assets/img/strawberry.png",
      "kkal":90,
      "checkState":false
    },
    {
      "type":"adds",
      "addsType":"chocolate",
      "name":"Snickers",
      "img":"assets/img/chocolate.png",
      "kkal":90,
      "checkState":false
    },
    {
      "type":"adds",
      "addsType":"chocolate",
      "name":"Nuts",
      "img":"assets/img/chocolate.png",
      "kkal":90,
      "checkState":false
    },
    {
      "type":"adds",
      "addsType":"chocolate",
      "name":"KitKat",
      "img":"assets/img/chocolate.png",
      "kkal":90,
      "checkState":false
    },
    {
      "type":"adds",
      "addsType":"milk",
      "name":"Milk",
      "img":"assets/img/milk.png",
      "kkal":90,
      "checkState":false
    },
    {
      "type":"adds",
      "addsType":"milk",
      "name":"Condensed milk",
      "img":"assets/img/milk.png",
      "kkal":90,
      "checkState":false
    },
    {
      "type":"adds",
      "addsType":"milk",
      "name":"Creams",
      "img":"assets/img/milk.png",
      "kkal":90,
      "checkState":false
    },
    {
      "type":"adds",
      "addsType":"alcohol",
      "name":"Whiskey",
      "img":"assets/img/whiskey.png",
      "kkal":90,
      "checkState":false
    },
    {
      "type":"adds",
      "addsType":"alcohol",
      "name":"Rum",
      "img":"assets/img/whiskey.png",
      "kkal":90,
      "checkState":false
    },
    {
      "type":"adds",
      "addsType":"alcohol",
      "name":"Cognac",
      "img":"assets/img/whiskey.png",
      "kkal":90,
      "checkState":false
    }
  ];

  public getIngridientsByType(type:string):IngridientInterface[]{
    return this.ingridientsDataBase.filter(ingridient=>{
      return ingridient.type === type;
    });
  }

  constructor() { }

}
