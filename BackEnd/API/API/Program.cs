using API.Models;
using Microsoft.EntityFrameworkCore;
using System.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Agregar CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()   // Permite cualquier origen (frontend)
              .AllowAnyMethod()   // Permite cualquier método HTTP (GET, POST, etc.)
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

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configurar el pipeline HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Aplicar la configuración de CORS antes de autorización
app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run();