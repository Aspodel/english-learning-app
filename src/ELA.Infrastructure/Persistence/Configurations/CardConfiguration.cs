namespace ELA;

public class CardConfiguration : IEntityTypeConfiguration<Card>
{
    public void Configure(EntityTypeBuilder<Card> builder)
    {
        builder.HasKey(c => c.Id);

        builder.Property(c => c.Front).IsRequired().HasMaxLength(250);
        builder.Property(c => c.Back).IsRequired().HasMaxLength(500);

        builder.HasOne(c => c.Deck)
            .WithMany(d => d.Cards)
            .HasForeignKey(c => c.DeckId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(c => c.ReviewLogs)
            .WithOne()
            .HasForeignKey(r => r.CardId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}