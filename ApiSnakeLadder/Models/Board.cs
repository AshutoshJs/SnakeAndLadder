using System;

namespace ApiSnakeLadder.Models
{
    public class Board
    {
        //Board has list of cells
        public List<List<Cell>> Cells {  get; set; }

        public Board(){}

        public Board(int boardSize, int? numberOfSnakes, int? numberOfLadders)
        {
            boardSize = boardSize == 0 ? 8 : boardSize;
            if (boardSize == 8) 
            {
                numberOfSnakes = 4;
                numberOfLadders = 3;
            }
            if (boardSize == 6)
            {
                numberOfSnakes = 12;
                numberOfLadders = 9;
            }
            this.Cells = new List<List<Cell>>(boardSize);
            this.InitializeBoard(boardSize);
            this.InitializeSnakeAndLAdder(numberOfSnakes ?? 4, numberOfLadders ?? 3);
        }

        public void InitializeBoard(int boardSize)
        {
            for (int i = 0; i < boardSize; i++)
            { 
            this.Cells.Add(new List<Cell>(boardSize));
                for (int j = 0; j < boardSize; j++)
                {
                    this.Cells[i].Add(new Cell(i,j));
                }

            }
            //return ;
        }
        public void InitializeSnakeAndLAdder(int numberOfSnakes, int numberOfLadders)
        {

            // for  now lets do it hardcoded snakes
            for(int i = 0; i <= numberOfSnakes; i++)
            {
                var cordinate = GetRandomCordinate();
                this.Cells.Any(x => x.Equals(cordinate)) ? this.Cells[cordinate.X][cordinate.Y].AddSnake



            }
            for (int i = 0; i <= numberOfLadders; i++)
            {

            }

        }

        public Cordinates GetRandomCordinate()
        {
            Random random = new Random();
            var cordinateOne = random.Next(0, 7);
            var cordinateSecond = random.Next(0, 7);
            return new Cordinates(cordinateOne, cordinateSecond);
        }

        public bool AddSnakeAtCordinate(Cordinates cordinate, Snake snake = null)//sanke will have start and end cordinates
        {
            //start cordnatew wiil be same as cordinate at which sanke is sitting
            //end cordinate w have to define
            this.Cells[cordinate.X][cordinate.Y].AddSnake()
            return false;
        }
    }
}
