using Microsoft.EntityFrameworkCore;
using SimpleShop.Application.Interfaces;
using SimpleShop.Application.Services;
using SimpleShop.Infrastructure.Persistence;
using SimpleShop.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Controllers
builder.Services.AddControllers();

// Built-in OpenAPI for .NET 9
builder.Services.AddOpenApi();

// Database
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")));

// Dependency Injection
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IProductService, ProductService>();

// CORS for the Angular admin client
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAdminClient", policy =>
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

var app = builder.Build();

// Development OpenAPI endpoint
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors("AllowAdminClient");

app.MapControllers();

app.Run();