using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace AdminService.Models;

public partial class P09AgroconnectdbContext : DbContext
{
    public P09AgroconnectdbContext()
    {
    }

    public P09AgroconnectdbContext(DbContextOptions<P09AgroconnectdbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Appliedscheme> Appliedschemes { get; set; }

    public virtual DbSet<Bankaccount> Bankaccounts { get; set; }

    public virtual DbSet<Brand> Brands { get; set; }

    public virtual DbSet<Cart> Carts { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Farmer> Farmers { get; set; }

    public virtual DbSet<Feedback> Feedbacks { get; set; }

    public virtual DbSet<Government> Governments { get; set; }

    public virtual DbSet<Location> Locations { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<Payment> Payments { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<Productrental> Productrentals { get; set; }

    public virtual DbSet<Productvendor> Productvendors { get; set; }

    public virtual DbSet<Rentalsp> Rentalsps { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Scheme> Schemes { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<Vendor> Vendors { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=localhost;port=3306;database=p09_agroconnectdb;user=root;password=Suraj@12345", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.2.0-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Appliedscheme>(entity =>
        {
            entity.HasKey(e => e.Aid).HasName("PRIMARY");

            entity.ToTable("appliedscheme");

            entity.HasIndex(e => e.Fid, "fkfidapplied_idx");

            entity.HasIndex(e => e.Gid, "fkgidapplied_idx");

            entity.Property(e => e.Aid)
                .ValueGeneratedNever()
                .HasColumnName("aid");
            entity.Property(e => e.Fid).HasColumnName("fid");
            entity.Property(e => e.Gid).HasColumnName("gid");
            entity.Property(e => e.Status).HasColumnName("status");

            entity.HasOne(d => d.FidNavigation).WithMany(p => p.Appliedschemes)
                .HasForeignKey(d => d.Fid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fkfidapplied");

            entity.HasOne(d => d.GidNavigation).WithMany(p => p.Appliedschemes)
                .HasForeignKey(d => d.Gid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fkgidapplied");
        });

        modelBuilder.Entity<Bankaccount>(entity =>
        {
            entity.HasKey(e => e.Accid).HasName("PRIMARY");

            entity.ToTable("bankaccount");

            entity.HasIndex(e => e.Accid, "accid_UNIQUE").IsUnique();

            entity.HasIndex(e => e.Accno, "accno").IsUnique();

            entity.Property(e => e.Accid).HasColumnName("accid");
            entity.Property(e => e.Accno)
                .HasMaxLength(45)
                .HasColumnName("accno");
            entity.Property(e => e.Bankname)
                .HasMaxLength(45)
                .HasColumnName("bankname");
            entity.Property(e => e.Branchname)
                .HasMaxLength(45)
                .HasColumnName("branchname");
            entity.Property(e => e.Ifsccode)
                .HasMaxLength(45)
                .HasColumnName("ifsccode");
        });

        modelBuilder.Entity<Brand>(entity =>
        {
            entity.HasKey(e => e.Bid).HasName("PRIMARY");

            entity.ToTable("brands");

            entity.HasIndex(e => e.Bid, "bid_UNIQUE").IsUnique();

            entity.HasIndex(e => e.Bname, "bname_UNIQUE").IsUnique();

            entity.HasIndex(e => e.Cid, "cidfk_brand_idx");

            entity.Property(e => e.Bid).HasColumnName("bid");
            entity.Property(e => e.Bname)
                .HasMaxLength(65)
                .HasColumnName("bname");
            entity.Property(e => e.Cid).HasColumnName("cid");

            entity.HasOne(d => d.CidNavigation).WithMany(p => p.Brands)
                .HasForeignKey(d => d.Cid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("cidfk_brand");
        });

        modelBuilder.Entity<Cart>(entity =>
        {
            entity.HasKey(e => e.Cartid).HasName("PRIMARY");

            entity.ToTable("cart");

            entity.HasIndex(e => e.Pvid, "pvid");

            entity.Property(e => e.Cartid).HasColumnName("cartid");
            entity.Property(e => e.Pvid).HasColumnName("pvid");
            entity.Property(e => e.Quantity).HasColumnName("quantity");

            entity.HasOne(d => d.Pv).WithMany(p => p.Carts)
                .HasForeignKey(d => d.Pvid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("cart_ibfk_1");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.Cid).HasName("PRIMARY");

            entity.ToTable("category");

            entity.HasIndex(e => e.Cid, "cid_UNIQUE").IsUnique();

            entity.Property(e => e.Cid).HasColumnName("cid");
            entity.Property(e => e.Cname)
                .HasMaxLength(45)
                .HasColumnName("cname");
            entity.Property(e => e.Ctype)
                .HasMaxLength(45)
                .HasColumnName("ctype");
            entity.Property(e => e.Description)
                .HasMaxLength(255)
                .HasColumnName("description");
        });

        modelBuilder.Entity<Farmer>(entity =>
        {
            entity.HasKey(e => e.Fid).HasName("PRIMARY");

            entity.ToTable("farmer");

            entity.HasIndex(e => e.Fid, "fid_UNIQUE").IsUnique();

            entity.HasIndex(e => e.Locid, "flocid_idx");

            entity.HasIndex(e => e.Uid, "uid_idx");

            entity.Property(e => e.Fid).HasColumnName("fid");
            entity.Property(e => e.Income)
                .HasPrecision(8, 2)
                .HasColumnName("income");
            entity.Property(e => e.Landsize).HasColumnName("landsize");
            entity.Property(e => e.Locid).HasColumnName("locid");
            entity.Property(e => e.Uid).HasColumnName("uid");

            entity.HasOne(d => d.Loc).WithMany(p => p.Farmers)
                .HasForeignKey(d => d.Locid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("flocid");

            entity.HasOne(d => d.UidNavigation).WithMany(p => p.Farmers)
                .HasForeignKey(d => d.Uid)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("fuid");
        });

        modelBuilder.Entity<Feedback>(entity =>
        {
            entity.HasKey(e => e.Feedid).HasName("PRIMARY");

            entity.ToTable("feedback");

            entity.HasIndex(e => e.Uid, "user_id_idx");

            entity.HasIndex(e => e.Vid, "vid_id_idx");

            entity.Property(e => e.Feedid).HasColumnName("feedid");
            entity.Property(e => e.Date).HasColumnName("date");
            entity.Property(e => e.Message)
                .HasColumnType("text")
                .HasColumnName("message");
            entity.Property(e => e.Uid).HasColumnName("uid");
            entity.Property(e => e.Vid).HasColumnName("vid");

            entity.HasOne(d => d.UidNavigation).WithMany(p => p.Feedbacks)
                .HasForeignKey(d => d.Uid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fuserid");

            entity.HasOne(d => d.VidNavigation).WithMany(p => p.Feedbacks)
                .HasForeignKey(d => d.Vid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fvid");
        });

        modelBuilder.Entity<Government>(entity =>
        {
            entity.HasKey(e => e.Gid).HasName("PRIMARY");

            entity.ToTable("government");

            entity.HasIndex(e => e.Gid, "gid_UNIQUE").IsUnique();

            entity.HasIndex(e => e.Uid, "uid_idx");

            entity.Property(e => e.Gid).HasColumnName("gid");
            entity.Property(e => e.Deptname)
                .HasMaxLength(45)
                .HasColumnName("deptname");
            entity.Property(e => e.Designation)
                .HasMaxLength(45)
                .HasColumnName("designation");
            entity.Property(e => e.Empno).HasColumnName("empno");
            entity.Property(e => e.Uid).HasColumnName("uid");

            entity.HasOne(d => d.UidNavigation).WithMany(p => p.Governments)
                .HasForeignKey(d => d.Uid)
                .HasConstraintName("guserid");
        });

        modelBuilder.Entity<Location>(entity =>
        {
            entity.HasKey(e => e.Locid).HasName("PRIMARY");

            entity.ToTable("location");

            entity.HasIndex(e => e.Locid, "locid_UNIQUE").IsUnique();

            entity.HasIndex(e => e.Locname, "locname_UNIQUE").IsUnique();

            entity.Property(e => e.Locid).HasColumnName("locid");
            entity.Property(e => e.Locname)
                .HasMaxLength(45)
                .HasColumnName("locname");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.Oid).HasName("PRIMARY");

            entity.ToTable("orders");

            entity.HasIndex(e => e.Cartid, "ocartid_idx");

            entity.HasIndex(e => e.Fid, "ofid");

            entity.Property(e => e.Oid).HasColumnName("oid");
            entity.Property(e => e.Amount)
                .HasPrecision(10, 2)
                .HasColumnName("amount");
            entity.Property(e => e.Cartid).HasColumnName("cartid");
            entity.Property(e => e.Fid).HasColumnName("fid");
            entity.Property(e => e.Orderdate).HasColumnName("orderdate");

            entity.HasOne(d => d.Cart).WithMany(p => p.Orders)
                .HasForeignKey(d => d.Cartid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("ocartid");

            entity.HasOne(d => d.FidNavigation).WithMany(p => p.Orders)
                .HasForeignKey(d => d.Fid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("ofid");
        });

        modelBuilder.Entity<Payment>(entity =>
        {
            entity.HasKey(e => e.Payid).HasName("PRIMARY");

            entity.ToTable("payment");

            entity.HasIndex(e => e.Oid, "poid_idx");

            entity.Property(e => e.Payid).HasColumnName("payid");
            entity.Property(e => e.Method)
                .HasMaxLength(50)
                .HasColumnName("method");
            entity.Property(e => e.Oid).HasColumnName("oid");
            entity.Property(e => e.Paydate).HasColumnName("paydate");

            entity.HasOne(d => d.OidNavigation).WithMany(p => p.Payments)
                .HasForeignKey(d => d.Oid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("poid");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.Prodid).HasName("PRIMARY");

            entity.ToTable("product");

            entity.HasIndex(e => e.Cid, "pcid");

            entity.HasIndex(e => e.Bid, "product_bidfk_idx");

            entity.Property(e => e.Prodid).HasColumnName("prodid");
            entity.Property(e => e.Bid).HasColumnName("bid");
            entity.Property(e => e.Cid).HasColumnName("cid");
            entity.Property(e => e.Pdescription)
                .HasColumnType("text")
                .HasColumnName("pdescription");
            entity.Property(e => e.Pname)
                .HasMaxLength(100)
                .HasColumnName("pname");

            entity.HasOne(d => d.BidNavigation).WithMany(p => p.Products)
                .HasForeignKey(d => d.Bid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("product_bid");

            entity.HasOne(d => d.CidNavigation).WithMany(p => p.Products)
                .HasForeignKey(d => d.Cid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("product_ibfk_1");
        });

        modelBuilder.Entity<Productrental>(entity =>
        {
            entity.HasKey(e => e.Prorid).HasName("PRIMARY");

            entity.ToTable("productrental");

            entity.HasIndex(e => e.Prodid, "fk_prodid_pr_idx");

            entity.HasIndex(e => e.Vid, "fk_vid_pr_idx");

            entity.Property(e => e.Prorid).HasColumnName("prorid");
            entity.Property(e => e.Prodid).HasColumnName("prodid");
            entity.Property(e => e.Rateperday)
                .HasPrecision(10)
                .HasColumnName("rateperday");
            entity.Property(e => e.Vid).HasColumnName("vid");

            entity.HasOne(d => d.Prod).WithMany(p => p.Productrentals)
                .HasForeignKey(d => d.Prodid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_prodid_pr");

            entity.HasOne(d => d.VidNavigation).WithMany(p => p.Productrentals)
                .HasForeignKey(d => d.Vid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_vid_pr");
        });

        modelBuilder.Entity<Productvendor>(entity =>
        {
            entity.HasKey(e => e.Pvid).HasName("PRIMARY");

            entity.ToTable("productvendor");

            entity.HasIndex(e => e.Prodid, "pvprodid_idx");

            entity.HasIndex(e => e.Vid, "pvvid_idx");

            entity.Property(e => e.Pvid).HasColumnName("pvid");
            entity.Property(e => e.Price)
                .HasPrecision(10, 2)
                .HasColumnName("price");
            entity.Property(e => e.Prodid).HasColumnName("prodid");
            entity.Property(e => e.Vid).HasColumnName("vid");

            entity.HasOne(d => d.Prod).WithMany(p => p.Productvendors)
                .HasForeignKey(d => d.Prodid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("pvprodid");

            entity.HasOne(d => d.VidNavigation).WithMany(p => p.Productvendors)
                .HasForeignKey(d => d.Vid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("pvvid");
        });

        modelBuilder.Entity<Rentalsp>(entity =>
        {
            entity.HasKey(e => e.Prid).HasName("PRIMARY");

            entity.ToTable("rentalsp");

            entity.HasIndex(e => e.Oid, "proid");

            entity.Property(e => e.Prid).HasColumnName("prid");
            entity.Property(e => e.Deposit)
                .HasPrecision(10, 2)
                .HasColumnName("deposit");
            entity.Property(e => e.Duration).HasColumnName("duration");
            entity.Property(e => e.Oid).HasColumnName("oid");

            entity.HasOne(d => d.OidNavigation).WithMany(p => p.Rentalsps)
                .HasForeignKey(d => d.Oid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("proid");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Rid).HasName("PRIMARY");

            entity.ToTable("role");

            entity.HasIndex(e => e.Rid, "rid_UNIQUE").IsUnique();

            entity.HasIndex(e => e.Rname, "rname_UNIQUE").IsUnique();

            entity.Property(e => e.Rid).HasColumnName("rid");
            entity.Property(e => e.Rname)
                .HasMaxLength(100)
                .HasColumnName("rname");
        });

        modelBuilder.Entity<Scheme>(entity =>
        {
            entity.HasKey(e => e.Schemeid).HasName("PRIMARY");

            entity.ToTable("schemes");

            entity.HasIndex(e => e.Gid, "gov_id_idx");

            entity.HasIndex(e => e.Schemeid, "schemeid_UNIQUE").IsUnique();

            entity.Property(e => e.Schemeid).HasColumnName("schemeid");
            entity.Property(e => e.Description)
                .HasMaxLength(255)
                .HasColumnName("description");
            entity.Property(e => e.Eligibility)
                .HasMaxLength(255)
                .HasColumnName("eligibility");
            entity.Property(e => e.Gid).HasColumnName("gid");
            entity.Property(e => e.Lastdate).HasColumnName("lastdate");
            entity.Property(e => e.Schemename)
                .HasMaxLength(45)
                .HasColumnName("schemename");
            entity.Property(e => e.Startdate).HasColumnName("startdate");

            entity.HasOne(d => d.GidNavigation).WithMany(p => p.Schemes)
                .HasForeignKey(d => d.Gid)
                .HasConstraintName("fk_scheme_government");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Uid).HasName("PRIMARY");

            entity.ToTable("users");

            entity.HasIndex(e => e.Rid, "rid_idx");

            entity.HasIndex(e => e.Uid, "uid_UNIQUE").IsUnique();

            entity.HasIndex(e => e.Username, "username_UNIQUE").IsUnique();

            entity.Property(e => e.Uid).HasColumnName("uid");
            entity.Property(e => e.Email)
                .HasMaxLength(45)
                .HasColumnName("email");
            entity.Property(e => e.Fname)
                .HasMaxLength(45)
                .HasColumnName("fname");
            entity.Property(e => e.Lname)
                .HasMaxLength(45)
                .HasColumnName("lname");
            entity.Property(e => e.Mobileno)
                .HasMaxLength(15)
                .HasColumnName("mobileno");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .HasColumnName("password");
            entity.Property(e => e.Rid).HasColumnName("rid");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.Username)
                .HasMaxLength(100)
                .HasColumnName("username");

            entity.HasOne(d => d.RidNavigation).WithMany(p => p.Users)
                .HasForeignKey(d => d.Rid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("rid");
        });

        modelBuilder.Entity<Vendor>(entity =>
        {
            entity.HasKey(e => e.Vid).HasName("PRIMARY");

            entity.ToTable("vendors");

            entity.HasIndex(e => e.Liscenceno, "liscenceno_UNIQUE").IsUnique();

            entity.HasIndex(e => e.Vid, "vid_UNIQUE").IsUnique();

            entity.HasIndex(e => e.Uid, "vuid_idx");

            entity.Property(e => e.Vid).HasColumnName("vid");
            entity.Property(e => e.Companyname)
                .HasMaxLength(45)
                .HasColumnName("companyname");
            entity.Property(e => e.Liscenceno)
                .HasMaxLength(45)
                .HasColumnName("liscenceno");
            entity.Property(e => e.Uid).HasColumnName("uid");

            entity.HasOne(d => d.UidNavigation).WithMany(p => p.Vendors)
                .HasForeignKey(d => d.Uid)
                .HasConstraintName("vuid");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
