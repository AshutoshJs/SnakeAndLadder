namespace ApiSnakeLadder.Models
{
    public class Cell
    {
        //cell has ladder or sanke and dthose calss has method to cut a player or let climb a player
        public Cordinates Cordinate{ get; set; }
        //public List<Snake> Snake { get; set; } wrong as single cell will have one sanke or ladder not multiple 
        //public List<Ladder> Ladder{ get; set; } wrong as single cell will have one sanke or ladder not multiple 
        public Cell(){}

        public Cell(int x, int y) 
        {
            /*was thorwing error of object not set ...
             this.Cordinate.X = x;
            this.Cordinate.Y = y;*/
            this.Cordinate = new Cordinates(x,y);
        }
    }
}
