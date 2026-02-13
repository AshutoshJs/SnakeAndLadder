import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../game.service';

@Component({
    selector: 'app-board',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="game-container">
      <div class="board">
        <div 
          *ngFor="let square of squares()" 
          class="square" 
          [class.player-is-here]="gameService.playerPosition() === square"
          [class.snake-start]="isSnakeStart(square)"
          [class.ladder-start]="isLadderStart(square)"
          [attr.data-square]="square">
          <span class="square-number">{{ square }}</span>
          <div *ngIf="gameService.playerPosition() === square" class="player-token"></div>
        </div>
      </div>

      <div class="controls">
        <div class="status">
            <p *ngIf="gameService.gameStatus() === 'won'" class="win-message">🎉 You Won! 🎉</p>
            <p *ngIf="gameService.gameStatus() === 'playing'">Current Position: {{ gameService.playerPosition() }}</p>
            <p *ngIf="gameService.diceValue() !== null">Dice Rolled: {{ gameService.diceValue() }}</p>
        </div>
        <button (click)="gameService.rollDice()" [disabled]="gameService.gameStatus() === 'won'">Roll Dice 🎲</button>
        <button (click)="gameService.resetGame()" *ngIf="gameService.gameStatus() === 'won'">Play Again 🔄</button>
      </div>
    </div>
  `,
    styles: [`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #fce4ec; /* Light pink/purple tint suitable for the theme */
    }

    .game-container {
      display: flex;
      gap: 2rem;
      align-items: flex-start;
      padding: 2rem;
      background: white;
      border-radius: 1rem;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }

    .board {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      grid-template-rows: repeat(6, 1fr);
      gap: 0.5rem;
      width: 400px; /* Specific size for 6x6 */
      height: 400px;
      position: relative;
    }

    .square {
      background-color: #f3e5f5; /* Light purple */
      border-radius: 0.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      color: #7b1fa2;
      position: relative;
      transition: background-color 0.3s ease;
    }

    /* Checkerboard pattern simulation or just uniform squares */
    .square:nth-child(even) {
      background-color: #e1bee7;
    }

    .square-number {
        position: absolute;
        top: 2px;
        left: 4px;
        font-size: 0.7rem;
        opacity: 0.6;
    }

    .player-token {
      width: 2rem;
      height: 2rem;
      background-color: #ff4081; /* Hot pink */
      border-radius: 50%;
      box-shadow: 0 4px 6px rgba(0,0,0,0.2);
      z-index: 10;
      animation: bounce 0.5s ease;
    }

    /* Simple indicators for snakes/ladders */
    .snake-start {
      border: 2px solid #d32f2f;
      background-color: #ffcdd2 !important;
    }
    .ladder-start {
      border: 2px solid #388e3c;
      background-color: #c8e6c9 !important;
    }

    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }

    .controls {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        min-width: 200px;
    }

    button {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 2rem;
        background: linear-gradient(135deg, #7b1fa2, #ff4081);
        color: white;
        font-weight: bold;
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;
        font-size: 1rem;
    }

    button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(123, 31, 162, 0.4);
    }

    button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
    }

    .status {
        padding: 1rem;
        background: #f5f5f5;
        border-radius: 0.5rem;
        text-align: center;
    }

    .win-message {
        color: #d32f2f; /* Using red/pink for celebration to match theme */
        font-size: 1.2rem;
        font-weight: bold;
    }

  `]
})
export class BoardComponent {
    gameService = inject(GameService);

    // Generate board squares 36 down to 1
    // For a snake and ladder board, usually row 1 is bottom left (1..6), row 2 is right to left (12..7), etc.
    // Or simplified: just a grid 1..36.
    // Standard board is boustrophedon (winding).
    // Let's implement winding for visual correctness if requested "minimalist" but usually board layouts wind.
    // For simplicity and minimalist UI, I will just render 1-36 top-left to bottom-right or 36-1.
    // Wait, standard board:
    // Row 6: 36 35 34 33 32 31
    // Row 5: 25 26 27 28 29 30
    // ...
    // This is complex to render in simple CSS grid without manual ordering. 
    // I will use a simple linear grid 1-36 bottom-up for logical simplicity vs visual.
    // Actually, standard CSS Grid fills row by row.
    // Let's generate squares in an array corresponding to visual position.

    squares = computed(() => {
        // We want visual representation:
        // 31 32 33 34 35 36 (Top Row?) - Standard is usually 1 at bottom.
        // Let's make 1 at BOTTOM LEFT.
        // So visual rows are:
        // 36 35 34 33 32 31
        // 25 26 27 28 29 30
        // 24 23 22 21 20 19
        // 13 14 15 16 17 18
        // 12 11 10 09 08 07
        // 01 02 03 04 05 06

        // This winding pattern is tricky.
        // Let's create an array of 36 numbers ordered as they should appear in the grid cells (0 to 35 indices).
        const visualSquares: number[] = [];
        for (let row = 5; row >= 0; row--) {
            const isEvenRow = row % 2 === 0; // 0-indexed row from bottom (0 is bottom row)
            // Visual Board Loop:
            // Row 5 (Top): 36..31 (Reverse) if we want standard Snake Ladder logic?
            // Actually standard:
            // 36 35 ... 31 (Even from top if 6 rows? 6 is even) - wait.
            // Let's just do:
            // Row 6 (Top): 31..36 ? No typically:
            // 100 .. 91
            // ..
            // 1 .. 10
            // So Row index 5 (top) corresponds to 31-36 range.
            // If row 0 (bottom) is 1-6.

            const rowStart = row * 6 + 1;
            const rowEnd = rowStart + 5;

            let rowNums: number[] = [];
            for (let i = rowStart; i <= rowEnd; i++) rowNums.push(i);

            // If row index (0-based from bottom) is ODD, it goes Right->Left (6..1 is wrong, 1..6 is L->R).
            // Standard:
            // Row 0 (Bottom): 1 2 3 4 5 6 (L -> R)
            // Row 1: 12 11 10 9 8 7 (R -> L)
            // Row 2: 13 14 15 16 17 18 (L -> R)
            // ...

            if (row % 2 !== 0) {
                rowNums.reverse();
            }

            visualSquares.push(...rowNums);
        }
        // Note: My loop above generates from Bottom (row=0) to Top (row=5). 
        // CSS Grid places first items at top. So I need to reverse the *order of rows*.
        // Actually, I can just build it Top to Bottom.

        const finalGrid: number[] = [];
        for (let row = 5; row >= 0; row--) {
            let start = row * 6 + 1;
            let end = start + 5;
            let r = [];
            for (let k = start; k <= end; k++) r.push(k);

            if (row % 2 !== 0) r.reverse(); // 12..7
            finalGrid.push(...r);
        }

        return finalGrid;
    });

    isSnakeStart(square: number) {
        return this.gameService.snakes.some(s => s.start === square);
    }

    isLadderStart(square: number) {
        return this.gameService.ladders.some(l => l.start === square);
    }
}
