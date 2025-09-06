namespace ELA;

public record ChangePasswordCommand(string UserId, string CurrentPassword, string NewPassword) : IRequest<Unit>;

public class ChangePasswordCommandHandler : IRequestHandler<ChangePasswordCommand, Unit>
{
    private readonly IIdentityService _identityService;

    public ChangePasswordCommandHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task<Unit> Handle(ChangePasswordCommand request, CancellationToken cancellationToken)
    {
        var result = await _identityService.ChangePasswordAsync(
            request.UserId, request.CurrentPassword, request.NewPassword);

        result.ThrowIfFailed(nameof(ChangePasswordCommand));

        return Unit.Value;
    }
}
