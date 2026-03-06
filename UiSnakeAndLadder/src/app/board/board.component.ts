import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../game.service';

@Component({
    selector: 'app-board',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './board.component.html',
    styleUrl: './board.component.scss'
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
