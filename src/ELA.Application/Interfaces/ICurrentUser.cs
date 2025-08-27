namespace ELA;

public interface ICurrentUser
{
    string? Id { get; }
    List<string>? Roles { get; }

}