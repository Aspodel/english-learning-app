using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace ELA;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>, IApplicationDbContext
{
    public DbSet<Vocabulary> Vocabularies => Set<Vocabulary>();
    public DbSet<Definition> Definitions => Set<Definition>();
    public DbSet<Example> Examples => Set<Example>();
    public DbSet<Deck> Decks => Set<Deck>();
    public DbSet<Card> Cards => Set<Card>();
    public DbSet<ReviewLog> ReviewLogs => Set<ReviewLog>();

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
    }
}