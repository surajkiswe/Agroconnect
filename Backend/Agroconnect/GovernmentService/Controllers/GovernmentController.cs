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

        //// POST: Register new government user
        //[HttpPost]
        //public IActionResult AddGovernment(Government govt)
        //{
        //    _context.Governments.Add(govt);
        //    _context.SaveChanges();
        //    return Ok(govt);
        //}



        [HttpPost("register")]
        public IActionResult RegisterGovernment([FromBody] Government governmentData)
        {
            try
            {
                // 1. Save User first
                var user = new User
                {
                    Username = governmentData.UidNavigation.Username,
                    Password = governmentData.UidNavigation.Password,
                    Rid = governmentData.UidNavigation.Rid,
                    Mobileno = governmentData.UidNavigation.Mobileno,
                    Email = governmentData.UidNavigation.Email,
                    Fname = governmentData.UidNavigation.Fname,
                    Lname = governmentData.UidNavigation.Lname,
                    Status = 1
                };

                _context.Users.Add(user);
                _context.SaveChanges(); // Generates Uid

                // 2. Save Government with the generated Uid
                var government = new Government
                {
                    Uid = user.Uid,
                    Empno = governmentData.Empno,
                    Deptname = governmentData.Deptname,
                    Designation = governmentData.Designation
                };

                _context.Governments.Add(government);
                _context.SaveChanges();

                return Ok(new { message = "Government registered successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }



        // POST: Add new scheme
        [HttpPost("add_scheme")]
        public async Task<IActionResult> AddScheme([FromBody] Scheme scheme)
        {
            if (scheme == null)
                return BadRequest("Invalid scheme data.");

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

        // GET: Get government GID by UID
        [HttpGet("get_by_userid/{userid}")]
        public IActionResult GetGovernmentByUserId(int userid)
        {
            try
            {
                var government = _context.Governments.FirstOrDefault(g => g.Uid == userid);
                if (government == null)
                    return NotFound(new { message = "Government user not found for given userid." });

                return Ok(new { gid = government.Gid });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error retrieving government user.", error = ex.Message });
            }
        }

        // GET: Schemes for a specific government
        [HttpGet("getSchemes/{gid}")]
        public IActionResult GetSchemesByGovernmentId(int gid)
        {
            var schemes = _context.Schemes
                .Where(s => s.Gid == gid)
                .Select(s => new {
                    s.Schemeid,
                    s.Schemename,
                    s.Description,
                    s.Eligibility,
                    s.Income,
                    s.Landsize,
                    s.Startdate,
                    s.Lastdate
                })
                .ToList();

            return Ok(schemes);
        }

        // GET: All schemes (for public or admin view)
        [HttpGet("getall")]
        public async Task<ActionResult<IEnumerable<object>>> GetAllSchemes()
        {
            var schemes = await _context.Schemes
                .Select(s => new {
                    s.Schemeid,
                    s.Schemename,
                    s.Description,
                    s.Eligibility,
                    s.Income,
                    s.Landsize,
                    s.Startdate,
                    s.Lastdate
                })
                .ToListAsync();

            return Ok(schemes);
        }

        // GET: Scheme by ID
        [HttpGet("getSchemeById/{id}")]
        public async Task<IActionResult> GetSchemeById(int id)
        {
            var scheme = await _context.Schemes
                .Where(s => s.Schemeid == id)
                .Select(s => new {
                    s.Schemeid,
                    s.Schemename,
                    s.Description,
                    s.Eligibility,
                    s.Income,
                    s.Landsize,
                    s.Startdate,
                    s.Lastdate,
                    s.Gid
                })
                .FirstOrDefaultAsync();

            if (scheme == null)
                return NotFound(new { message = "Scheme not found." });

            return Ok(scheme);
        }

        // PUT: Update scheme by ID
        [HttpPut("updateScheme/{id}")]
        public async Task<IActionResult> UpdateScheme(int id, [FromBody] Scheme updatedScheme)
        {
            var scheme = await _context.Schemes.FindAsync(id);
            if (scheme == null)
                return NotFound(new { message = "Scheme not found" });

            scheme.Schemename = updatedScheme.Schemename;
            scheme.Description = updatedScheme.Description;
            scheme.Eligibility = updatedScheme.Eligibility;
            scheme.Startdate = updatedScheme.Startdate;
            scheme.Lastdate = updatedScheme.Lastdate;

            try
            {
                await _context.SaveChangesAsync();
                return Ok(new { message = "Scheme updated successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error updating scheme", error = ex.Message });
            }
        }

        // DELETE: Remove a scheme by ID
        [HttpDelete("deleteScheme/{id}")]
        public async Task<IActionResult> DeleteScheme(int id)
        {
            var scheme = await _context.Schemes.FindAsync(id);
            if (scheme == null)
                return NotFound(new { message = "Scheme not found" });

            _context.Schemes.Remove(scheme);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Scheme deleted successfully" });
        }
    }
}
