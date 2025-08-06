using System;
using System.Collections.Generic;

namespace AdminService.Models;

public partial class Brand
{
    public int Bid { get; set; }

    public string Bname { get; set; } = null!;

    public int Cid { get; set; }

    public virtual Category CidNavigation { get; set; } = null!;

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
