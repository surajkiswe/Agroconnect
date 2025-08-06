using System;
using System.Collections.Generic;

namespace AdminService.Models;

public partial class Role
{
    public int Rid { get; set; }

    public string Rname { get; set; } = null!;

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
