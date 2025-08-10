using System;
using System.Collections.Generic;

namespace GovernmentService.Models;

public partial class Productvendor
{
    public int Pvid { get; set; }

    public int Prodid { get; set; }

    public int Vid { get; set; }

    public decimal? Price { get; set; }

    public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();

    public virtual ICollection<Orderdetail> Orderdetails { get; set; } = new List<Orderdetail>();

    public virtual Product Prod { get; set; } = null!;

    public virtual Vendor VidNavigation { get; set; } = null!;
}
