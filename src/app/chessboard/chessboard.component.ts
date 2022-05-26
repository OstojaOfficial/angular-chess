import { Component, OnInit } from '@angular/core';
import { SharedService } from './../shared.service';

import * as ChessJS from "chess.js";

@Component({
  selector: 'app-chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.scss']
})
export class ChessboardComponent implements OnInit {
  square!: any[];
  winner!: string | null;
  private chess: any;

  first!: number;

  constructor(private sharedService:SharedService) {
    const Chess = typeof ChessJS === "function" ? ChessJS : ChessJS.Chess;
    this.chess = new Chess();
  }

  ngOnInit(): void {
    this.square = Array(64).fill("");
    this.newGame();
  }

  newGame() {
    this.chess.reset();
    this.square.fill("");
    this.winner = null;
    this.first = -1;
    let i = 0;
    this.chess.board().forEach((element: any) => {
      for(var j in element) {
        if(element[j] == null) 
          this.square[i] = null;
        else {
          console.log(element[j].type);
          this.square[i] = element[j].type;
        }
        i++;
      }
    });
    this.sharedService.sendClickEvent();
  }

  get player() {
    return this.chess.turn() == "w" ? "White" : "Black";
  }

  makeMove(idx: number) {
    if (!this.chess.game_over()) {
      if(this.first == -1 && this.square[idx] != "")
        this.first = idx;
      else {
        if(this.chess.moves({ square: `${this.numToCord(this.first)}` }).length != 0) {
          this.chess.move(`${this.numToCord(this.first)}${this.numToCord(idx)}`, { sloppy: true });
          var i = 0;
          this.square.fill("");
          this.chess.board().forEach((element: any) => {
            for(var j in element) {
              if(element[j] == null) {
                this.square[i] = "";
              }
              else {
                console.log(element[j].type);
                this.square[i] = element[j].type;
              }
              i++;
            }
          });
        }
        console.log(this.chess.ascii());
        this.first = -1;
        this.sharedService.sendClickEvent();
      }
    }
    if(this.chess.game_over() == true) {
      this.winner = this.chess.turn() == "w" ? "Black" : "White";
    }
  }

  numToCord(number: number){
    var i = 0;
    var red = 0;
    let rhzarray = ['a','b','c','d','e','f','g','h'];

    while(number >= i*8){
        red = i;
        i++;
    }
    var redhorizontalni = number-(red*8);
    var basonajreddobar = rhzarray[redhorizontalni];
    return basonajreddobar + ((8+1)-(red+1));
  }
}
