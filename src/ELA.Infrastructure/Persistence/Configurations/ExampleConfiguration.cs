namespace ELA;

public class ExampleConfiguration : IEntityTypeConfiguration<Example>
{
    public void Configure(EntityTypeBuilder<Example> builder)
    {
        builder.HasKey(e => e.Id);

        builder.Property(e => e.Text)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(e => e.Translation)
            .HasMaxLength(500);
    }
}
