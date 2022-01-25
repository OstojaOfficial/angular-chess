import { Component, OnInit } from '@angular/core';

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

  constructor() {
    const Chess = typeof ChessJS === "function" ? ChessJS : ChessJS.Chess;
    this.chess = new Chess();
  }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.chess.reset();
    this.square = Array(64).fill(null);
    this.winner = null;
    this.first = -1;
    var i = 0;
    this.chess.board().forEach((element: any) => {
      for(var j in element) {
        if(!element[j]) 
          this.square.splice(i, 1, "");
        else
          this.square.splice(i, 1, element[j].type);
        i++;
      }
    });
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
          this.chess.board().forEach((element: any) => {
            for(var j in element) {
              if(!element[j]) 
                this.square.splice(i, 1, "");
              else
                this.square.splice(i, 1, element[j].type);
              i++;
            }
          });
        }
        this.first = -1;
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
