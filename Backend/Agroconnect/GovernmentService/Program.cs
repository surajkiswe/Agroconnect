using GovernmentService.Models;
using Microsoft.EntityFrameworkCore;
using Steeltoe.Discovery.Client;

namespace GovernmentService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddDiscoveryClient(builder.Configuration);


            // ✅ 1. Add your DbContext with MySQL configuration
            builder.Services.AddDbContext<P09AgroconnectdbContext>(options =>
                options.UseMySql(
                    builder.Configuration.GetConnectionString("DefaultConnection"),
                    ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))
                )
            );

            // ✅ 2. Add CORS policy
            //builder.Services.AddCors(options =>
            //{
            //    options.AddPolicy("AllowReactApp", policy =>
            //    {
            //        policy.WithOrigins("http://localhost:3000") // Your React frontend
            //              .AllowAnyHeader()
            //              .AllowAnyMethod();
            //    });
            //});

            // Add services to the container
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            app.UseDiscoveryClient();

            // Configure the HTTP request pipeline
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            //app.UseHttpsRedirection();

            // ✅ 3. Enable CORS here (before authorization)
            app.UseCors("AllowReactApp");

            app.UseAuthorization();
            app.MapControllers();

            app.Run();
        }
    }
}
