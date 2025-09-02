using ELA;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.AddApplicationServices();
builder.AddInfrastructureServices();
builder.AddWebApiServices();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    await app.InitialiseDatabaseAsync();

    app.MapOpenApi();
    app.MapScalarApiReference(
        options =>
        {
            options
            .WithTitle("ELA API Reference");
        }
    );
}

app.UseHealthChecks("/health");

app.UseHttpsRedirection();

app.UseExceptionHandler(options => { });

app.MapControllers();

app.Run();

public partial class Program { }