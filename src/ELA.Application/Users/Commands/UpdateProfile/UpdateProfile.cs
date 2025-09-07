namespace ELA;

public record UpdateProfileCommand(string Email, string FirstName, string LastName) : IRequest<Unit>;

public class UpdateProfileCommandHandler : IRequestHandler<UpdateProfileCommand, Unit>
{
    private readonly IIdentityService _identityService;
    private readonly ICurrentUser _currentUser;

    public UpdateProfileCommandHandler(IIdentityService identityService, ICurrentUser currentUser)
    {
        _identityService = identityService;
        _currentUser = currentUser;
    }

    public async Task<Unit> Handle(UpdateProfileCommand request, CancellationToken cancellationToken)
    {
        if (_currentUser.Id is null)
            throw new UnauthorizedAccessException();

        var result = await _identityService.UpdateProfileAsync(
            _currentUser.Id, request.Email, request.FirstName, request.LastName);

        result.ThrowIfFailed(nameof(UpdateProfileCommand));

        return Unit.Value;
    }
}