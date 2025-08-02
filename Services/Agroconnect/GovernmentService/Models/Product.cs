using System;
using System.Collections.Generic;

namespace GovernmentService.Models;

public partial class Product
{
    public int Prodid { get; set; }

    public int Cid { get; set; }

    public string Pname { get; set; } = null!;

    public string? Pdescription { get; set; }

    public virtual Category CidNavigation { get; set; } = null!;

    public virtual ICollection<Productvendor> Productvendors { get; set; } = new List<Productvendor>();
}
