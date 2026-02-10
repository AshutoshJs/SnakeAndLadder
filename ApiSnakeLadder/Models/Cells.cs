namespace ApiSnakeLadder.Models
{
    public class Cells
    {
        //cell has ladder or sanke and dthose calss has method to cut a player or let climb a player
        public Cordinates Cordinate{ get; set; }
        public Cells(){}

        public Cells(int x, int y) 
        {
            /*was thorwing error of object not set ...
             this.Cordinate.X = x;
            this.Cordinate.Y = y;*/
            this.Cordinate = new Cordinates(x,y);
        }
    }
}
