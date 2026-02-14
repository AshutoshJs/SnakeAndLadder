namespace ApiSnakeLadder.Models
{
    public class Dice
    {
        public int RolledNumber{ get; set; }
        public int DiceRollingCount { get; set; }

        public int RollTheDice()
        {
            Random random = new Random();
            return random.Next(1, 7);//1 inclusive 7 exclusive
        }
    }
}
