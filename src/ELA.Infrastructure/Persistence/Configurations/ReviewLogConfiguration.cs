namespace ELA;

public class ReviewLogConfiguration : IEntityTypeConfiguration<ReviewLog>
{
    public void Configure(EntityTypeBuilder<ReviewLog> builder)
    {
        builder.HasKey(r => r.Id);

        builder.Property(r => r.ReviewDate).IsRequired();
    }
}
