namespace ApiSnakeLadder.Models
{
    public class Snake
    {
        //every snake will on a box so it will have its starting cordinate and ending cordinate
        //startCordinate decides where snake is sitting to bite the player
        //endCordinate decides at which cordinate palyer fell
        //always start>end
        public required Cordinates Start { get; set; }
        public required Cordinates End { get; set; }

        public Snake(){}

        public Snake(Cordinates start, Cordinates end)
        {
            this.Start = start;
            this.End = end;
        }
    }
}
