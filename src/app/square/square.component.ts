import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  template: `
    <button *ngIf="!value">{{ value }}</button>
    <button *ngIf="value == 'p'">{{ value }}</button>
    <button *ngIf="value == 'r'">{{ value }}</button>
    <button *ngIf="value == 'n'">{{ value }}</button>
    <button *ngIf="value == 'b'">{{ value }}</button>
    <button *ngIf="value == 'q'">{{ value }}</button>
    <button *ngIf="value == 'k'">{{ value }}</button>
  `,
  styles: ['button { width: 100%; height: 100%; font-size: 1em !important; }']
})
export class SquareComponent {
  @Input() value!: string;
}
