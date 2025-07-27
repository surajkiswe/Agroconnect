using System;
using System.Collections.Generic;

namespace GovernmentService.Models;

public partial class User
{
    public int Uid { get; set; }

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public int Rid { get; set; }

    public string Mobileno { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Fname { get; set; } = null!;

    public string Lname { get; set; } = null!;

    public sbyte Status { get; set; }

    public virtual ICollection<Farmer> Farmers { get; set; } = new List<Farmer>();

    public virtual ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();

    public virtual ICollection<Government> Governments { get; set; } = new List<Government>();

    public virtual Role RidNavigation { get; set; } = null!;

    public virtual ICollection<Vendor> Vendors { get; set; } = new List<Vendor>();
}
