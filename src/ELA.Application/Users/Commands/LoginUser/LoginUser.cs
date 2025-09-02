namespace ELA;

public record LoginUserCommand(string UserName, string Password) : IRequest<string>;

public class LoginUserHandler : IRequestHandler<LoginUserCommand, string>
{
    private readonly IIdentityService _identityService;
    private readonly IJwtTokenService _jwtService;

    public LoginUserHandler(IIdentityService identityService, IJwtTokenService jwtService)
    {
        _identityService = identityService;
        _jwtService = jwtService;
    }

    public async Task<string> Handle(LoginUserCommand request, CancellationToken cancellationToken)
    {
        var isValid = await _identityService.CheckPasswordAsync(request.UserName, request.Password);
        if (!isValid) throw new UnauthorizedAccessException("Invalid credentials.");

        var roles = new List<string>();
        var userId = await _identityService.GetUserNameAsync(request.UserName) ?? throw new UnauthorizedAccessException();

        return _jwtService.GenerateToken(userId, request.UserName, roles);
    }
}
