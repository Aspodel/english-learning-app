namespace ELA;

public interface IIdentityService
{
    Task<string?> GetUserNameAsync(string userId);

    Task<bool> IsInRoleAsync(string userId, string role);

    Task<bool> AuthorizeAsync(string userId, string policyName);

    Task<(Result Result, string UserId)> CreateUserAsync(string userName, string password, string? email = null, string? firstName = null, string? lastName = null, DateOnly? dateOfBirth = null);

    Task<Result> DeleteUserAsync(string userId);

    Task<(Result Result, string? Token)> LoginAsync(string userName, string password);

    Task<Result> ChangePasswordAsync(string userId, string currentPassword, string newPassword);

    Task<Result> UpdateProfileAsync(string userId, string? email, string? firstName, string? lastName, DateOnly? dateOfBirth);

    Task<UserDto?> GetUserByIdAsync(string userId);

    IQueryable<UserDto> GetAllUsersAsync();
}
