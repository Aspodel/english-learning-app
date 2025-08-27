using Microsoft.EntityFrameworkCore;

namespace ELA;

public class AppDbContext : DbContext
{
    public DbSet<Vocabulary> Vocabularies => Set<Vocabulary>();
    public DbSet<Definition> Definitions => Set<Definition>();
    public DbSet<Example> Examples => Set<Example>();
    public DbSet<Card> Cards => Set<Card>();
    public DbSet<ReviewLog> ReviewLogs => Set<ReviewLog>();

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
    }
}