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

        builder.OwnsOne(d => d.PartOfSpeech, pos =>
        {
            pos.Property(p => p.Name)
               .HasColumnName("PartOfSpeech")
               .HasMaxLength(50)
               .IsRequired(false);

            pos.Property(p => p.Abbreviation)
               .HasColumnName("POS_Abbreviation")
               .HasMaxLength(10)
               .IsRequired(false);
        });

        builder.Navigation(d => d.PartOfSpeech)
            .IsRequired(false);

        builder.HasMany(d => d.Examples)
            .WithOne()
            .HasForeignKey("DefinitionId")
            .OnDelete(DeleteBehavior.Cascade);
    }
}
