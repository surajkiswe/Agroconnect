using Microsoft.AspNetCore.Mvc;
using AdminService.Models;
using Microsoft.EntityFrameworkCore;
using AdminService.Models.Dto;

namespace AdminService.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AdminController : ControllerBase
{
    private readonly P09AgroconnectdbContext _context;

    public AdminController(P09AgroconnectdbContext context)
    {
        _context = context;
    }

    // GET all categories
    [HttpGet("categories")]
    public IActionResult GetAllCategories()
    {
        try
        {
            var categories = _context.Categories.ToList();
            return Ok(categories);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error fetching categories", error = ex.Message });
        }
    }

    [HttpGet("brands/{cid}")]
    public IActionResult GetBrandsByCategory(int cid)
    {
        try
        {
            var brands = _context.Brands
                .Where(b => b.Cid == cid)
                .ToList();

            return Ok(brands);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error fetching brands", error = ex.Message });
        }
    }



    [HttpPost("addProduct")]
    public IActionResult AddProduct(AddProductDto dto)
    {
        try
        {
            var brand = _context.Brands.FirstOrDefault(b => b.Bid == dto.Bid);
            if (brand == null)
            {
                return NotFound(new { message = "Brand not found" });
            }

            var product = new Product
            {
                Pname = dto.Pname,
                Pdescription = dto.Pdescription,
                Bid = dto.Bid,
                Cid = brand.Cid // ✅ Use category from brand table
            };

            _context.Products.Add(product);
            _context.SaveChanges();

            return Ok(new { message = "✅ Product added successfully" });
        }
        catch (DbUpdateException dbEx)
        {
            return StatusCode(500, new
            {
                message = "❌ DB update error",
                error = dbEx.InnerException?.Message ?? dbEx.Message
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                message = "❌ Unexpected error",
                error = ex.Message
            });
        }
    }






    [HttpGet("getAllProducts")]
    public IActionResult GetAllProducts()
    {
        var products = _context.Products
            .Include(p => p.CidNavigation) // include Category details
            .Include(p => p.BidNavigation) // include Brand details
            .Select(p => new
            {
                p.Prodid,
                p.Pname,
                p.Pdescription,
                CategoryId = p.Cid,
                CategoryName = p.CidNavigation.Cname,
                CategoryType = p.CidNavigation.Ctype,
                BrandId = p.Bid,
                BrandName = p.BidNavigation.Bname
            })
            .ToList();

        return Ok(products);
    }



    // ✅ GET products by Category ID
    [HttpGet("getProductById")]
    public IActionResult GetProductById(int prodid)
    {
        var product = _context.Products
            .Include(p => p.CidNavigation)
            .FirstOrDefault(p => p.Prodid == prodid);

        if (product == null)
            return NotFound();

        return Ok(product);
    }

    [HttpPut("updateProduct")]
    public async Task<IActionResult> UpdateProduct([FromBody] UpdateProductDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest("Invalid input");

        try
        {
            var existingProduct = await _context.Products.FindAsync(dto.Prodid);

            if (existingProduct == null)
                return NotFound("Product not found");

            existingProduct.Pname = dto.Pname;
            existingProduct.Pdescription = dto.Pdescription;
            existingProduct.Cid = dto.Cid;

            _context.Products.Update(existingProduct);
            await _context.SaveChangesAsync();

            return Ok("Product updated successfully");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }




    [HttpDelete("deleteProduct")]
    public IActionResult DeleteProduct(int prodid)
    {
        var product = _context.Products.FirstOrDefault(p => p.Prodid == prodid);
        if (product == null)
            return NotFound();

        _context.Products.Remove(product);
        _context.SaveChanges();

        return NoContent(); // 204
    }

 

        // ✅ GET all users
        [HttpGet("getAllUsers")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _context.Users
                .Include(u => u.RidNavigation) // for role name
                .Select(u => new UserResponseDto
                {
                    Uid = u.Uid,
                    Username = u.Username,
                    Fname = u.Fname,
                    Lname = u.Lname,
                    Email = u.Email,
                    Role = u.RidNavigation.Rname
                })
                .ToListAsync();

            return Ok(users);
        }

    // ✅ DELETE user by uid
    [HttpDelete("deleteUser")]
    public IActionResult DeleteUser(int uid)
    {
        try
        {
            var user = _context.Users.FirstOrDefault(u => u.Uid == uid);
            if (user == null)
                return NotFound(new { message = "User not found" });

            _context.Users.Remove(user);
            _context.SaveChanges(); // Related child records will be deleted automatically

            return Ok(new { message = "User deleted successfully" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Internal server error", error = ex.Message });
        }
    }


}
