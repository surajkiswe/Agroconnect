using Microsoft.AspNetCore.Mvc;
using GovernmentService.Models;
using Microsoft.EntityFrameworkCore;

namespace GovernmentService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GovernmentController : ControllerBase
    {
        private readonly P09AgroconnectdbContext _context;

        public GovernmentController(P09AgroconnectdbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public IActionResult RegisterGovernment([FromBody] Government govt)
        {
            try
            {
                _context.Governments.Add(govt);
                _context.SaveChanges();
                return Ok("Government user registered successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error: " + ex.Message);
            }
        }
    }

}
