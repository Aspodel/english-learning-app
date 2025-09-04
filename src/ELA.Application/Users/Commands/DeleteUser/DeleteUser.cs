using FluentValidation.Results;

namespace ELA;

public record DeleteUserCommand(string UserId) : IRequest;

public class DeleteUserHandler : IRequestHandler<DeleteUserCommand>
{
    private readonly IIdentityService _identityService;

    public DeleteUserHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task Handle(DeleteUserCommand request, CancellationToken cancellationToken)
    {
        var result = await _identityService.DeleteUserAsync(request.UserId);

        result.ThrowIfFailed(nameof(DeleteUserCommand));
    }
}
