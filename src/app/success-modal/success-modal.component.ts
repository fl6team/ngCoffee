import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
export interface ConfirmModel {
  title:string;
  message:string;
}
@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.css']
})
export class SuccessModalComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  title: string;
  name:string
  public message;
  constructor(dialogService: DialogService) {
    super(dialogService);
  }
  confirm() {
    this.close();
  }
}
