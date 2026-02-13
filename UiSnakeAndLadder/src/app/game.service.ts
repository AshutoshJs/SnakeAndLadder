import { Injectable, signal, computed } from '@angular/core';

export interface SnakeOrLadder {
  start: number;
  end: number;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  readonly boardSize = 36; // 6x6
  readonly rows = 6;
  readonly cols = 6;

  // Game State
  playerPosition = signal<number>(1);
  diceValue = signal<number | null>(null);
  gameStatus = signal<'playing' | 'won'>('playing');
  
  // Configuration
  snakes: SnakeOrLadder[] = [
    { start: 17, end: 7 },
    { start: 19, end: 5 },
    { start: 21, end: 9 },
    { start: 27, end: 1 }
  ];

  ladders: SnakeOrLadder[] = [
    { start: 3, end: 22 },
    { start: 5, end: 8 },
    { start: 11, end: 26 },
    { start: 20, end: 29 }
  ];

  constructor() {}

  rollDice() {
    if (this.gameStatus() === 'won') return;

    const roll = Math.floor(Math.random() * 6) + 1;
    this.diceValue.set(roll);
    this.movePlayer(roll);
  }

  resetGame() {
    this.playerPosition.set(1);
    this.diceValue.set(null);
    this.gameStatus.set('playing');
  }

  private movePlayer(steps: number) {
    let current = this.playerPosition();
    let next = current + steps;

    if (next > this.boardSize) {
      // Must land exactly on 36 to win, otherwise stay put (or bounce back - sticking to stay put for simplicity)
      return;
    }

    // Check for snakes or ladders
    next = this.checkSnakeOrLadder(next);

    this.playerPosition.set(next);

    if (next === this.boardSize) {
      this.gameStatus.set('won');
    }
  }

  private checkSnakeOrLadder(position: number): number {
    const snake = this.snakes.find(s => s.start === position);
    if (snake) {
      return snake.end;
    }

    const ladder = this.ladders.find(l => l.start === position);
    if (ladder) {
      return ladder.end;
    }

    return position;
  }
}
