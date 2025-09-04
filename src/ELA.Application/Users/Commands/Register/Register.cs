namespace ELA;

public record RegisterCommand(string UserName, string Password) : IRequest<string>;

public class RegisterHandler : IRequestHandler<RegisterCommand, string>
{
    private readonly IIdentityService _identityService;

    public RegisterHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task<string> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        var (result, userId) = await _identityService.CreateUserAsync(request.UserName, request.Password);

        result.ThrowIfFailed(nameof(RegisterCommand));

        return userId;
    }
}
