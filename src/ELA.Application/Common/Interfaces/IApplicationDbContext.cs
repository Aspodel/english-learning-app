namespace ELA;

public interface IApplicationDbContext
{
    DbSet<Vocabulary> Vocabularies { get; }
    DbSet<Definition> Definitions { get; }
    DbSet<Example> Examples { get; }
    DbSet<Deck> Decks { get; }
    DbSet<Card> Cards { get; }
    DbSet<ReviewLog> ReviewLogs { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
