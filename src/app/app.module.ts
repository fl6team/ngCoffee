import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//Routes(navi)
import { routes } from './app.routes';


//Services
import { CupService } from './cup.service'
import { IngridientsService } from './ingridients.service';

import { AppComponent } from './app.component';
import { PredefinedComponent } from './predefined/predefined.component';
import { SizeComponent } from './size/size.component';
import { ConfigComponent } from './config/config.component';
import { BaseConfigComponent } from './base-config/base-config.component';
import { AddsConfigComponent } from './adds-config/adds-config.component';
import { CupFillingComponent } from './cup-filling/cup-filling.component';

import {DragulaModule, DragulaService} from 'ng2-dragula/ng2-dragula';
import {TooltipModule} from "ngx-tooltip";
import { FinalComponent } from './final/final.component';

@NgModule({
  declarations: [
    AppComponent,
    PredefinedComponent,
    SizeComponent,
    ConfigComponent,
    BaseConfigComponent,
    AddsConfigComponent,
    CupFillingComponent,
    FinalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes,
    DragulaModule,
    TooltipModule
  ],
  providers: [
    CupService,
    IngridientsService,
    DragulaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
