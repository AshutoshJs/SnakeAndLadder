namespace ApiSnakeLadder.Models
{
    public class Cell
    {
        //cell has ladder or sanke and dthose calss has method to cut a player or let climb a player
        //public List<Snake> Snake { get; set; } wrong as single cell will have one sanke or ladder not multiple 
        //public List<Ladder> Ladder{ get; set; } wrong as single cell will have one sanke or ladder not multiple 
        public Cordinates Cordinate{ get; set; }

        public Snake? Snake{ get; set; }

        public Ladder? Ladder{ get; set; }

        public Cell(Cordinates cordinates) 
        {
            this.Cordinate = cordinates;
        }
        public Cell(int x, int y) 
        {
            /*was thorwing error of object not set ...
             this.Cordinate.X = x;
            this.Cordinate.Y = y;
            The error occurred because this.Cordinate was null when you tried to assign values to X
            and Y. To fix it, you need to ensure that the Cordinate object is initialized before you
            access its properties. This is done by using new Cordinates(x, y) in the constructor or
            at some other point before accessing X and Y.*/
            this.Cordinate = new Cordinates(x,y);
        }

        public bool AddSnake(Snake snake)
        {
            /* this will not throw error unlike this.Cordinate.X = x bacuse we are assigning 
            a reference type proeprty its original*/
            this.Snake = snake;
            return true;
        }

        public bool AddLadder(Ladder ladder)
        {
            this.Ladder = ladder ;
            return true;
        }
    }
}
