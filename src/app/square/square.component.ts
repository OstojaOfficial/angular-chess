import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  template: `
    <button nbButton *ngIf="!value" [ngStyle]="{'background-color': num%2==0 ? '#edd5bd' : '#79534c'}">{{ value }}</button>
    <button nbButton *ngIf="value == 'p'" [ngStyle]="{'background-color': num%2==0 ? '#edd5bd' : '#79534c'}" >{{ value }}</button>
    <button nbButton *ngIf="value == 'r'" [ngStyle]="{'background-color': num%2==0 ? '#edd5bd' : '#79534c'}">{{ value }}</button>
    <button nbButton *ngIf="value == 'n'" [ngStyle]="{'background-color': num%2==0 ? '#edd5bd' : '#79534c'}">{{ value }}</button>
    <button nbButton *ngIf="value == 'b'" [ngStyle]="{'background-color': num%2==0 ? '#edd5bd' : '#79534c'}">{{ value }}</button>
    <button nbButton *ngIf="value == 'q'" [ngStyle]="{'background-color': num%2==0 ? '#edd5bd' : '#79534c'}">{{ value }}</button>
    <button nbButton *ngIf="value == 'k'" [ngStyle]="{'background-color': num%2==0 ? '#edd5bd' : '#79534c'}">{{ value }}</button>
  `,
  styleUrls: ['./square.component.scss']
})
export class SquareComponent {
  @Input() value!: string;
  @Input() num!: number;
}
