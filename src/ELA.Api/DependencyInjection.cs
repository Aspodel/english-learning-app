using ELA;

namespace Microsoft.Extensions.DependencyInjection;

public static class DependencyInjection
{
    public static void AddWebApiServices(this IHostApplicationBuilder builder)
    {
        builder.Services.AddDatabaseDeveloperPageExceptionFilter();

        builder.Services.AddScoped<ICurrentUser, CurrentUser>();
        builder.Services.AddHttpContextAccessor();

        builder.Services.AddOpenApi();
    }
}