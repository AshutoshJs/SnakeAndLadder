namespace ApiSnakeLadder.Models
{
    public class Board
    {
        //Board has list of cells
        List<List<Cells>> Cells {  get; set; }

        public Board(){}

        public Board(int boardSize)
        {
            this.Cells = new List<List<Cells>>(boardSize);
            this.InitializeBoard(boardSize);
        }

        public void InitializeBoard(int boardSize)
        {
            for (int i = 0; i < boardSize; i++)
            { 
            this.Cells.Add(new List<Cells>(boardSize));
                for (int j = 0; j < boardSize; j++)
                {
                    this.Cells[i].Add(new Cells(i,j));
                }

            }
            //return ;
        }
    }
}
