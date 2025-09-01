namespace ELA;

public class DefinitionConfiguration : IEntityTypeConfiguration<Definition>
{
    public void Configure(EntityTypeBuilder<Definition> builder)
    {
        builder.HasKey(d => d.Id);

        builder.Property(d => d.Meaning)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(d => d.Translation)
            .HasMaxLength(500);

        builder.OwnsOne(d => d.PartOfSpeech);

        builder.HasMany(d => d.Examples)
            .WithOne()
            .HasForeignKey("DefinitionId")
            .OnDelete(DeleteBehavior.Cascade);
    }
}
