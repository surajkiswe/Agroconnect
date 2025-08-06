using System;
using System.Collections.Generic;

namespace AdminService.Models;

public partial class Product
{
    public int Prodid { get; set; }

    public int Cid { get; set; }

    public string Pname { get; set; } = null!;

    public string? Pdescription { get; set; }

    public int Bid { get; set; }

    public virtual Brand BidNavigation { get; set; } = null!;

    public virtual Category CidNavigation { get; set; } = null!;

    public virtual ICollection<Productrental> Productrentals { get; set; } = new List<Productrental>();

    public virtual ICollection<Productvendor> Productvendors { get; set; } = new List<Productvendor>();
}
