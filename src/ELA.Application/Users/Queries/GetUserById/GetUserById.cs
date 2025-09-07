namespace ELA;

public record GetUserByIdQuery(string UserId) : IRequest<UserDto>;

public class GetUserByIdQueryHandler : IRequestHandler<GetUserByIdQuery, UserDto>
{
    private readonly IIdentityService _identityService;

    public GetUserByIdQueryHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task<UserDto> Handle(GetUserByIdQuery request, CancellationToken cancellationToken)
    {
        var user = await _identityService.GetUserByIdAsync(request.UserId);
        Guard.Against.NotFound(request.UserId, user);

        return user;
    }
}
