namespace ELA;

public class VocabularyConfiguration : IEntityTypeConfiguration<Vocabulary>
{
    public void Configure(EntityTypeBuilder<Vocabulary> builder)
    {
        builder.HasKey(v => v.Id);

        builder.Property(v => v.Text)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(v => v.IPA)
            .HasMaxLength(200);

        builder.HasMany(v => v.Definitions)
            .WithOne(d => d.Vocabulary)
            .HasForeignKey(d => d.VocabularyId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne<ApplicationUser>()
            .WithMany()
            .HasForeignKey(v => v.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
