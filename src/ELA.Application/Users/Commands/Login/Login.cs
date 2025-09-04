namespace ELA;

public record LoginCommand(string UserName, string Password) : IRequest<string>;

public class LoginHandler : IRequestHandler<LoginCommand, string>
{
    private readonly IIdentityService _identityService;
    private readonly IJwtTokenService _jwtService;

    public LoginHandler(IIdentityService identityService, IJwtTokenService jwtService)
    {
        _identityService = identityService;
        _jwtService = jwtService;
    }

    public async Task<string> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var (success, userId) = await _identityService.ValidateUserAsync(request.UserName, request.Password);
        if (!success || userId is null)
            throw new UnauthorizedAccessException("Invalid username or password");
            
        var roles = await _identityService.GetUserRolesAsync(userId);

        return _jwtService.GenerateToken(userId, request.UserName, roles);
    }
}