namespace ApiSnakeLadder.Models
{
    public class Player
    {
        public string Name { get; set; }
        public bool IsMyTurn{ get; set; }
        public Cordinates CurrentPosition { get; set; }
    }
}
