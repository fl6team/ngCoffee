import { Injectable } from '@angular/core';
import { IngridientInterface } from './ingridient-interface'
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class IngridientsService {
  public ingridientsDataBase = [
    // {
    //   "type":"base",
    //   "name":"Instant coffee",
    //   "addsType":"",
    //   "img":"assets/img/espresso.png",
    //   "kkal":110,
    //   "checkState":false,
    //   "fillPercentage":100,
    //   "disabled":false,
    //   "color":"#865a35",
    //   "price" :8
    // },
    // {
    //   "type":"base",
    //   "name":"Espresso",
    //   "addsType":"",
    //   "img":"assets/img/espresso.png",
    //   "kkal":110,
    //   "checkState":false,
    //   "fillPercentage":100,
    //   "disabled":false,
    //   "color":"#3f3222",
    //   "price" :9
    // },
    // {
    //   "type":"base",
    //   "name":"French press coffee",
    //   "addsType":"",
    //   "img":"assets/img/espresso.png",
    //   "kkal":110,
    //   "checkState":false,
    //   "fillPercentage":100,
    //   "disabled":false,
    //   "color":"#5b4837",
    //   "price" :10
    // },
    // {
    //   "type":"base",
    //   "name":"Ground coffee",
    //   "addsType":"",
    //   "img":"assets/img/espresso.png",
    //   "kkal":110,
    //   "checkState":false,
    //   "fillPercentage":100,
    //   "disabled":false,
    //   "color":"#5b4837",
    //   "price" :8
    // },
    // {
    //   "type":"base",
    //   "name":"Ristretto",
    //   "addsType":"",
    //   "img":"assets/img/espresso.png",
    //   "kkal":110,
    //   "checkState":false,
    //   "fillPercentage":100,
    //   "disabled":false,
    //   "color":"#1a1004",
    //   "price" :9
    // },
    // {
    //   "type":"base",
    //   "name":"Cubano",
    //   "addsType":"",
    //   "img":"assets/img/espresso.png",
    //   "kkal":110,
    //   "checkState":false,
    //   "fillPercentage":100,
    //   "disabled":false,
    //   "color":"#6b0e00",
    //   "price" :10
    // },
    // {
    //   "type":"adds",
    //   "addsType":"syrops",
    //   "name":"Cherry syrop",
    //   "img":"assets/img/cherries.png",
    //   "kkal":90,
    //   "checkState":false,
    //   "fillPercentage":25,
    //   "disabled":false,
    //   "color":"#ed3f32",
    //   "price" :4
    // },
    // {
    //   "type":"adds",
    //   "addsType":"syrops",
    //   "name":"Coconut syrop",
    //   "img":"assets/img/coconut.png",
    //   "kkal":90,
    //   "checkState":false,
    //   "fillPercentage":25,
    //   "disabled":false,
    //   "color":"#e6e6e6",
    //   "price" :5
    // },
    // {
    //   "type":"adds",
    //   "addsType":"syrops",
    //   "name":"Nut syrop",
    //   "img":"assets/img/hazelnut.png",
    //   "kkal":90,
    //   "checkState":false,
    //   "fillPercentage":25,
    //   "disabled":false,
    //   "color":"#af7e56",
    //   "price" :4
    // },
    // {
    //   "type":"adds",
    //   "addsType":"syrops",
    //   "name":"Strawberry syrop",
    //   "img":"assets/img/strawberry.png",
    //   "kkal":90,
    //   "checkState":false,
    //   "fillPercentage":25,
    //   "disabled":false,
    //   "color":"#e22f37",
    //   "price" :5
    // },
    // {
    //   "type":"adds",
    //   "addsType":"chocolate",
    //   "name":"Snickers",
    //   "img":"assets/img/chocolate.png",
    //   "kkal":90,
    //   "checkState":false,
    //   "fillPercentage":15,
    //   "disabled":false,
    //   "color":"#c8611e",
    //   "price" :6
    // },
    // {
    //   "type":"adds",
    //   "addsType":"chocolate",
    //   "name":"Nuts",
    //   "img":"assets/img/chocolate.png",
    //   "kkal":90,
    //   "checkState":false,
    //   "fillPercentage":15,
    //   "disabled":false,
    //   "color":"#d06c08",
    //   "price" :6
    // },
    // {
    //   "type":"adds",
    //   "addsType":"chocolate",
    //   "name":"KitKat",
    //   "img":"assets/img/chocolate.png",
    //   "kkal":90,
    //   "checkState":false,
    //   "fillPercentage":15,
    //   "disabled":false,
    //   "color":"#ae6627",
    //   "price" :6
    // },
    // {
    //   "type":"adds",
    //   "addsType":"milk",
    //   "name":"Milk",
    //   "img":"assets/img/milk.png",
    //   "kkal":90,
    //   "checkState":false,
    //   "fillPercentage":60,
    //   "disabled":false,
    //   "color":"#dee7e4",
    //   "price" :3
    // },
    // {
    //   "type":"adds",
    //   "addsType":"milk",
    //   "name":"Condensed milk",
    //   "img":"assets/img/milk.png",
    //   "kkal":90,
    //   "checkState":false,
    //   "fillPercentage":60,
    //   "disabled":false,
    //   "color":"#fbd999",
    //   "price" :3
    // },
    // {
    //   "type":"adds",
    //   "addsType":"milk",
    //   "name":"Creams",
    //   "img":"assets/img/milk.png",
    //   "kkal":90,
    //   "checkState":false,
    //   "fillPercentage":60,
    //   "disabled":false,
    //   "color":"#fcfcfc",
    //   "price" :4
    // },
    // {
    //   "type":"adds",
    //   "addsType":"alcohol",
    //   "name":"Whiskey",
    //   "img":"assets/img/whiskey.png",
    //   "kkal":90,
    //   "checkState":false,
    //   "fillPercentage":25,
    //   "disabled":false,
    //   "color":"#de3903",
    //   "price" :10
    // },
    // {
    //   "type":"adds",
    //   "addsType":"alcohol",
    //   "name":"Rum",
    //   "img":"assets/img/whiskey.png",
    //   "kkal":90,
    //   "checkState":false,
    //   "fillPercentage":25,
    //   "disabled":false,
    //   "color":"#fd9c00",
    //   "price" :8
    // },
    // {
    //   "type":"adds",
    //   "addsType":"alcohol",
    //   "name":"Cognac",
    //   "img":"assets/img/whiskey.png",
    //   "kkal":90,
    //   "checkState":false,
    //   "fillPercentage":25,
    //   "disabled":false,
    //   "color":"#ac2e1f",
    //   "price" :5
    // }
  ];

  public filterList = [
    {category:"all", text:"All", state:true},
    {category:"syrops", text:"Syrops", state:false},
    {category:"chocolate", text:"Chocolate adds", state:false},
    {category:"milk", text:"Milky adds", state:false},
    {category:"alcohol", text:"Alcohol", state:false},
  ]

  public getIngridientsByType(type:string):IngridientInterface[]{
    return this.ingridientsDataBase.filter( (ingridient) => {
      return ingridient.type === type;
    });
  }

  constructor(private http: Http) { }

  public fetchData(){
    return this.http.get('https://coffeeangular.firebaseio.com/ingredients.json').map(
      (res) => res.json()
    );
  }
  public fetchCoffee(){
    return this.http.get('https://coffeeangular.firebaseio.com/definedCoffee.json').map(
      (res) => res.json()
    );
  }
}
