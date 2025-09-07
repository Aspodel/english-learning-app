namespace ELA;

public record GetAllUsersQuery(
    int PageNumber = 1,
    int PageSize = 10
) : IRequest<PaginatedList<UserDto>>;

public class GetAllUsersQueryHandler : IRequestHandler<GetAllUsersQuery, PaginatedList<UserDto>>
{
    private readonly IIdentityService _identityService;

    public GetAllUsersQueryHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task<PaginatedList<UserDto>> Handle(GetAllUsersQuery request, CancellationToken cancellationToken)
    {
        var query = _identityService.GetAllUsersAsync()
                    .OrderBy(u => u.UserName)
                    .Skip((request.PageNumber - 1) * request.PageSize)
                    .Take(request.PageSize)
                    .AsNoTracking();

        return await PaginatedList<UserDto>.CreateAsync(query, request.PageNumber, request.PageSize, cancellationToken);
    }
}