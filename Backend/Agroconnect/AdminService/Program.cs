using AdminService.Models;
using Microsoft.EntityFrameworkCore;
using Steeltoe.Discovery.Client;
using System.Text.Json.Serialization;

namespace AdminService
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

            // ✅ 3. Add controllers with JSON options to fix circular reference error
            builder.Services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
                options.JsonSerializerOptions.WriteIndented = true;
            });

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

           // app.UseHttpsRedirection();

            // ✅ 4. Enable CORS before authorization
            app.UseCors("AllowReactApp");

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
