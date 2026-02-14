using ApiSnakeLadder.Models;
using Microsoft.AspNetCore.Mvc;

namespace ApiSnakeLadder.Controllers
{
    [ApiController]
    [Route("[controller]/[Action]")]
    public class GameController : ControllerBase
    {
        private readonly ILogger<GameController> _logger;
        public GameController(ILogger<GameController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "InitGame")]
        //public IEnumerable<WeatherForecast> Get()
        public IActionResult InitGame()
        {
            Board board = new Board(8);
            var a = 0;
            board.Cells[0][0].AddSnake(new Snake());

            return Ok(board);
        }

        [HttpGet(Name = "InitalizeGame")]
        //public IEnumerable<WeatherForecast> Get()
        public IActionResult InitalizeGame()
        {
            Board board = new Board(8);

            return Ok(board);
        }
    }
}
