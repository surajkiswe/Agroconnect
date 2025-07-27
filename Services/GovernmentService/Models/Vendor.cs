using System;
using System.Collections.Generic;

namespace GovernmentService.Models;

public partial class Vendor
{
    public int Vid { get; set; }

    public int Uid { get; set; }

    public string Liscenceno { get; set; } = null!;

    public string Companyname { get; set; } = null!;

    public virtual ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();

    public virtual ICollection<Productvendor> Productvendors { get; set; } = new List<Productvendor>();

    public virtual User UidNavigation { get; set; } = null!;
}
