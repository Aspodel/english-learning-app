namespace ELA;

public record GetCurrentUserQuery() : IRequest<UserDto>;

public class GetCurrentUserQueryHandler : IRequestHandler<GetCurrentUserQuery, UserDto>
{
    private readonly IIdentityService _identityService;
    private readonly ICurrentUser _currentUser;

    public GetCurrentUserQueryHandler(IIdentityService identityService, ICurrentUser currentUser)
    {
        _identityService = identityService;
        _currentUser = currentUser;
    }

    public async Task<UserDto> Handle(GetCurrentUserQuery request, CancellationToken cancellationToken)
    {
        if (_currentUser.Id is null)
            throw new UnauthorizedAccessException();

        var user = await _identityService.GetUserByIdAsync(_currentUser.Id);
        Guard.Against.NotFound(_currentUser.Id, user);

        return user;
    }
}
