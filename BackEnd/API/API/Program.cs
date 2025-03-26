using API.Models;
using Microsoft.EntityFrameworkCore;
using System.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Configurar CORS para permitir solicitudes desde cualquier origen
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()   // Permite solicitudes desde cualquier origen
              .AllowAnyMethod()   // Permite cualquier tipo de método HTTP (GET, POST, PUT, DELETE, etc.)
              .AllowAnyHeader();  // Permite cualquier encabezado
    });
});

builder.Services.AddDbContext<_4vodsContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("development"),
    new MySqlServerVersion(new Version(8, 0, 32))));

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });

builder.Services.AddSwaggerGen();
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

// Configurar el pipeline HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// **Aplicar la política de CORS antes de la autorización**
app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run();
