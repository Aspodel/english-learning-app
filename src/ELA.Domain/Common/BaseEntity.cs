namespace ELA;

public abstract class BaseEntity<T>
{
    public T Id { get; private init; } = default!;
}
