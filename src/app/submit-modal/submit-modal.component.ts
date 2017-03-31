import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
export interface ConfirmModel {
  title:string;
  message:string;
}
@Component({
    selector: 'confirm',
    templateUrl: './submit-modal.component.html',
})
export class SubmitModalComponent extends DialogComponent<ConfirmModel, string> implements ConfirmModel {
  title: string;
  name:string
  public message;
  constructor(dialogService: DialogService) {
    super(dialogService);
  }
  confirm() {
    this.result = this.name;
    this.close();
  }
}
