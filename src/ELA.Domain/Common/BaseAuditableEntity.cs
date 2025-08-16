namespace ELA;

public abstract class BaseAuditableEntity : BaseEntity
{
    public DateTimeOffset Created { get; private set; }
    public DateTimeOffset LastModified { get; private set; }

    protected BaseAuditableEntity()
    {
        var now = DateTimeOffset.UtcNow;
        Created = now;
        LastModified = now;
    }

    public void UpdateLastModified()
    {
        LastModified = DateTimeOffset.UtcNow;
    }
}
