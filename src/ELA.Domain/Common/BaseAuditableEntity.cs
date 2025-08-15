namespace ELA;

public abstract class BaseAuditableEntity : BaseEntity
{
    public DateTimeOffset Created { get; private set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset LastModified { get; private set; } = DateTimeOffset.UtcNow;

    public void UpdateLastModified()
    {
        LastModified = DateTimeOffset.UtcNow;
    }
}
