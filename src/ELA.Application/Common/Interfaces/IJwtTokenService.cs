namespace ELA;

public interface IJwtTokenService
{
    string GenerateToken(string userId, string userName, IList<string> roles);
}
