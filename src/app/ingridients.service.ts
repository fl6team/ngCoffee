import { Injectable } from '@angular/core';
import { IngridientInterface } from './ingridient-interface'
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
declare var firebase: any;

@Injectable()
export class IngridientsService {
  public ingridientsDataBase = [ ];

  public getIngridientsByType(type:string):IngridientInterface[]{
    return this.ingridientsDataBase.filter(ingridient=>{
      return ingridient.type === type;
    });
  }

  constructor(private http: Http) { }

  public fetchData(){
    return this.http.get('https://coffeeangular.firebaseio.com/.json').map(
      (res) => res.json()
    );
  }
}
