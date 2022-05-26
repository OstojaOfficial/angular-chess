import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from './../shared.service';
import { Subscription } from 'rxjs';

import { CheckboxControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-square',
  template: `
    <button nbButton *ngIf="!value" [ngStyle]="{'background-color': color}">{{ value }}</button>
    <button nbButton *ngIf="value == 'p'" [ngStyle]="{'background-color': color}" >{{ value }}</button>
    <button nbButton *ngIf="value == 'r'" [ngStyle]="{'background-color': color}">{{ value }}</button>
    <button nbButton *ngIf="value == 'n'" [ngStyle]="{'background-color': color}">{{ value }}</button>
    <button nbButton *ngIf="value == 'b'" [ngStyle]="{'background-color': color}">{{ value }}</button>
    <button nbButton *ngIf="value == 'q'" [ngStyle]="{'background-color': color}">{{ value }}</button>
    <button nbButton *ngIf="value == 'k'" [ngStyle]="{'background-color': color}">{{ value }}</button>
  `,
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit {
  clickEventsubscription:Subscription;
  constructor(private sharedService:SharedService) {
    this.clickEventsubscription = this.sharedService.getClickEvent().subscribe(() => {
    this.checkColor();
    })
  }
  @Input() value!: string;
  @Input() num!: number;
  @Input() color!: string;

  ngOnInit(): void {
    this.checkColor();
  }

  checkColor() {
    setTimeout(() => {
      if(Math.floor((this.num/8))%2 == 0) {
        this.color = this.num%2==0 ? '#edd5bd' : '#79534c';
      } else {
        this.color = this.num%2==0 ? '#79534c' : '#edd5bd';
      }
    }, 50);
    console.log("CHECKING COLOR!");
    console.log(this.num);
  }
}
