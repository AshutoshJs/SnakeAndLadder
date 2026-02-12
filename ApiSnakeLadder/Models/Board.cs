namespace ApiSnakeLadder.Models
{
    public class Board
    {
        //Board has list of cells
        List<List<Cell>> Cells {  get; set; }

        public Board(){}

        public Board(int boardSize, int numberOfSnakes, int numberOfLadders)
        {
            this.Cells = new List<List<Cell>>(boardSize);
            this.InitializeBoard(boardSize);
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
    }
}
