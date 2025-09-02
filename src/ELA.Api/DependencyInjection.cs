using ELA;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Models;

namespace Microsoft.Extensions.DependencyInjection;

public static class DependencyInjection
{
    public static void AddWebApiServices(this IHostApplicationBuilder builder)
    {
        builder.Services.AddDatabaseDeveloperPageExceptionFilter();

        builder.Services.AddScoped<ICurrentUser, CurrentUser>();

        builder.Services.AddHttpContextAccessor();

        builder.Services.AddHealthChecks()
            .AddDbContextCheck<ApplicationDbContext>();

        builder.Services.AddExceptionHandler<CustomExceptionHandler>();

        // Customise default API behaviour
        builder.Services.Configure<ApiBehaviorOptions>(options =>
            options.SuppressModelStateInvalidFilter = true);
            
        builder.Services.AddEndpointsApiExplorer();

        builder.Services.AddOpenApi(options =>
        {
            options.AddDocumentTransformer((document, context, cancellationToken) =>
            {
                document.Components ??= new();
                document.Components.SecuritySchemes["JWT"] = new OpenApiSecurityScheme
                {
                    Type = SecuritySchemeType.Http,
                    Scheme = "bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Name = "Authorization",
                    Description = "Type into the textbox: Bearer {your JWT token}"
                };

                // Apply security requirement globally
                document.SecurityRequirements.Add(new OpenApiSecurityRequirement
                {
                    [document.Components.SecuritySchemes["JWT"]] = Array.Empty<string>()
                });

                return Task.CompletedTask;
            });
        });

        builder.Services.AddControllers();
    }
}