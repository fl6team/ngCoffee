import { IngridientInterface } from './ingridient-interface';
import { CupInterface } from './cup-interface';

export class CupClass {
  size:CupInterface;
  name:string;
  base:IngridientInterface;
  adds:IngridientInterface[] = [];
  sugar;
  steps = [
    {
      name : "sizeState",
      avaliable: false,
      active: false,
      router:"size",
      message:"Coffee size",
      index:1
    },
    {
      name : "baseState",
      avaliable: false,
      active: false,
      router:"base",
      message:"Coffee base",
      index:2
    },
    {
      name : "addsState",
      avaliable: false,
      active: false,
      router:"adds",
      message:"Coffee additionals",
      index:3
    },
    {
      name : "fillState",
      avaliable: false,
      active: false,
      router:"fill-in",
      message:"Fill in a cup",
      index:4
    },
  ];
  makeStepAvaliable(name:string){
    this.steps.forEach(item=>{
      if(item.name === name){
        item.avaliable = true;
      }
    })
  };
  makeStepActive(name:string){
    this.steps.forEach(item=>{
      item.active = false;
      if(item.name === name){
        item.active = true;
      }
    })
  }
}
