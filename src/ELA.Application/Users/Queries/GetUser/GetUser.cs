namespace ELA;

public record GetUserQuery(string UserId) : IRequest<string?>;

public class GetUserHandler : IRequestHandler<GetUserQuery, string?>
{
    private readonly IIdentityService _identityService;

    public GetUserHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task<string?> Handle(GetUserQuery request, CancellationToken cancellationToken)
    {
        return await _identityService.GetUserNameAsync(request.UserId);
    }
}
