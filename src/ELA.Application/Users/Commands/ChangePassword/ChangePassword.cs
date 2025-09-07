namespace ELA;

public record ChangePasswordCommand(string CurrentPassword, string NewPassword) : IRequest<Unit>;

public class ChangePasswordCommandHandler : IRequestHandler<ChangePasswordCommand, Unit>
{
    private readonly IIdentityService _identityService;
    private readonly ICurrentUser _currentUser;

    public ChangePasswordCommandHandler(IIdentityService identityService, ICurrentUser currentUser)
    {
        _identityService = identityService;
        _currentUser = currentUser;
    }

    public async Task<Unit> Handle(ChangePasswordCommand request, CancellationToken cancellationToken)
    {
        if (_currentUser.Id is null)
            throw new UnauthorizedAccessException();

        var result = await _identityService.ChangePasswordAsync(
            _currentUser.Id, request.CurrentPassword, request.NewPassword);

        result.ThrowIfFailed(nameof(ChangePasswordCommand));

        return Unit.Value;
    }
}
