namespace ApiSnakeLadder.Models
{
    public class Game
    {
        public Board Board{ get; set; }
        //public List<Player> Players { get; set; }
        public Player Player1{ get; set; }
        public Player Player2 { get; set; }
        public Dice Dice{ get; set; }
        public Game(){}
        public Game(Player player1, Player player2) 
        {
            this.Player1 = player1;
            this.Player2 = player2;
            this.Board = new Board(8,4,3);
        }
    }
}
