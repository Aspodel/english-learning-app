using FluentValidation.Results;

namespace ELA;

public record RegisterUserCommand(string UserName, string Password) : IRequest<string>;

public class RegisterUserHandler : IRequestHandler<RegisterUserCommand, string>
{
    private readonly IIdentityService _identityService;

    public RegisterUserHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task<string> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
    {
        var (result, userId) = await _identityService.CreateUserAsync(request.UserName, request.Password);

        Guard.Against.InvalidInput(result.Succeeded, nameof(result), x => x, "User registration failed");


        return userId;
    }
}
