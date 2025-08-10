using System;
using System.Collections.Generic;

namespace GovernmentService.Models;

public partial class Category
{
    public int Cid { get; set; }

    public string Cname { get; set; } = null!;

    public string Ctype { get; set; } = null!;

    public string Description { get; set; } = null!;

    public virtual ICollection<Brand> Brands { get; set; } = new List<Brand>();

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
