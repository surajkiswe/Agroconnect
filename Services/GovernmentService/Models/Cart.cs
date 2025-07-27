using System;
using System.Collections.Generic;

namespace GovernmentService.Models;

public partial class Cart
{
    public int Cartid { get; set; }

    public int Pvid { get; set; }

    public int Quantity { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual Productvendor Pv { get; set; } = null!;
}
