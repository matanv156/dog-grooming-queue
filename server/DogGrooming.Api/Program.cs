

using System;
using DogGrooming.Api.Data;
using DogGrooming.Api.Models;
using DogGrooming.Api.Utils;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<DogGroomingContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DogGroomingDb"))
);

var allowedOrigins = builder.Configuration.GetSection("AllowedOrigins").Get<string[]>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendCors", policy =>
    {
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

#region Dependency Injection
builder.Services.AddScoped<HaircutTypeData>();
builder.Services.AddScoped<UserData>();
builder.Services.AddSingleton<JwtUtils>();
#endregion

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.Use(async (context, next) =>
{
    var jwtUtils = context.RequestServices.GetRequiredService<JwtUtils>();
    var authHeader = context.Request.Headers["Authorization"].FirstOrDefault();

    if (authHeader != null && authHeader.StartsWith("Bearer "))
    {
        var token = authHeader["Bearer ".Length..].Trim();
        var principal = jwtUtils.ValidateToken(token);
        if (principal != null)
        {
            context.User = principal;
        }
    }

    await next();
});

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("FrontendCors");
app.MapControllers();

app.Run();