namespace ELA;

public record LoginCommand(string UserName, string Password) : IRequest<string>;

public class LoginHandler : IRequestHandler<LoginCommand, string>
{
    private readonly IIdentityService _identityService;

    public LoginHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task<string> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var (result, token) = await _identityService.LoginAsync(request.UserName, request.Password);

        result.ThrowIfFailed(nameof(LoginCommand));
        Guard.Against.Null(token, nameof(token));

        return token;
    }
}