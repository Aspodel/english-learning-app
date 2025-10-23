# ================================
# BUILD STAGE
# ================================
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# Copy only the csproj files and restore dependencies
COPY src/ELA.Api/ELA.Api.csproj src/ELA.Api/
COPY src/ELA.Application/ELA.Application.csproj src/ELA.Application/
COPY src/ELA.Domain/ELA.Domain.csproj src/ELA.Domain/
COPY src/ELA.Infrastructure/ELA.Infrastructure.csproj src/ELA.Infrastructure/
COPY ELA.sln .

RUN dotnet restore src/ELA.Api/ELA.Api.csproj

# Copy all source code
COPY . .

# Build and publish the API
WORKDIR /app/src/ELA.Api
RUN dotnet publish -c Release -o /publish

# ================================
# RUNTIME STAGE
# ================================
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "ELA.Api.dll"]
