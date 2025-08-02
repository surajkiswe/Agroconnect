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

        [HttpPost("add_scheme")]
        public async Task<IActionResult> AddScheme([FromBody] Scheme scheme)
        {
            if (scheme == null)
            {
                return BadRequest("Invalid scheme data.");
            }

            try
            {
                _context.Schemes.Add(scheme);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Scheme added successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error adding scheme.", error = ex.Message });
            }
        }

        [HttpGet("get_by_userid/{userid}")]
        public IActionResult GetGovernmentByUserId(int userid)
        {
            try
            {
                var government = _context.Governments.FirstOrDefault(g => g.Uid == userid);
                if (government == null)
                {
                    return NotFound(new { message = "Government user not found for given userid." });
                }

                return Ok(new { gid = government.Gid });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error retrieving government user.", error = ex.Message });
            }
        }

        [HttpGet("getSchemes/{gid}")]
        public IActionResult GetSchemesByGovernmentId(int gid)
        {
            var schemes = _context.Schemes
                .Where(s => s.Gid == gid)
                .Select(s => new {
                    s.Schemeid,
                    s.Schemename,
                    s.Description,
                    s.Startdate,
                    s.Lastdate
                })
                .ToList();

            return Ok(schemes);
        }


    }

}
