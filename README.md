# 📚 English Learning App (ASP.NET Core + Clean Architecture)

A modular, scalable flashcard-style vocabulary learning system built with **ASP.NET Core Web API**, **Entity Framework Core**, and **PostgreSQL**. The project follows **Clean Architecture** and **Domain-Driven Design (DDD)** principles without CQRS.

## ⚙️ Tech Stack

- **ASP.NET Core Web API**
- **Entity Framework Core** (Code First)
- **PostgreSQL**
- **Clean Architecture** (Domain / Application / Infrastructure / API layers)
- **Domain-Driven Design (DDD)** principles

## 🧠 Features

- Manage vocabulary entries (Word, IPA, Definitions, Examples)
- Flashcard-based review system (like Anki) using spaced repetition
- Review logs to track user learning and progress
- Encapsulated business logic with rich domain models and value objects
- Separation of concerns with layered architecture
- EF Core mapping with value objects and clean persistence setup

## 📁 Project Structure

- **Domain** – Rich entities, value objects, and business rules
- **Application** – Use cases, DTOs, and interfaces
- **Infrastructure** – EF Core, PostgreSQL, repositories
- **API** – ASP.NET Core controllers and endpoints

## 🚀 Getting Started

1. Clone the repository

    ```bash
    git clone https://github.com/aspodel/ela.git
    cd ela
    ```

2. Set up PostgreSQL and update the connection string

   Update the `appsettings.json` file in the API project with your PostgreSQL connection string:

   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Host=localhost;Port=5432;Database=ela_db;Username=your_user;Password=your_password"
   }
   ```

   > **Note:** Replace `your_user` and `your_password` with your actual PostgreSQL credentials.

3. Run migrations and apply the database

    ```bash
    dotnet ef database update --project ELA.Infrastructure --startup-project ELA.API
    ```

4. Launch the API via Visual Studio or CLI

    ```bash
    dotnet run --project ELA.API
    ```

5. Access the API

    Once running, the API will be available at `https://localhost:5001` (or your configured port). You can test endpoints using Scarla UI at `/` or with tools like Postman.

## 📖 Learn More

- [Clean Architecture (Uncle Bob)](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Clean Architecture Explained](https://github.com/jasontaylordev/CleanArchitecture)
- [Domain-Driven Design Reference](https://domainlanguage.com/ddd/reference/)
- [SM-2 Algorithm Explained](https://www.supermemo.com/en/archives1990-2015/english/ol/sm2)

## 🔖 License

MIT — free to use and modify.
