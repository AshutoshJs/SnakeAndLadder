namespace ApiSnakeLadder.Models
{
    public class Cordinates
    {
        public int X{ get; set; }
        public int Y{ get; set; }

        public Cordinates(){}

        public Cordinates(int x, int y)
        {
            this.X = x;
            this.Y = y;
        }

        public override bool Equals(Object obj)
        {
            var item = obj as Cordinates;
            if (item == null) 
            {
                return false;
            }
            return this.X == item.X && this.Y == item.Y;
        }
    }
}
