using ELA.Decks.Dtos;

namespace ELA;

public record GetUserDecksQuery(
    int PageNumber = 1,
    int PageSize = 10
) : IRequest<PaginatedList<DeckListItemDto>>;

public class GetUserDecksQueryHandler : IRequestHandler<GetUserDecksQuery, PaginatedList<DeckListItemDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public GetUserDecksQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    public async Task<PaginatedList<DeckListItemDto>> Handle(GetUserDecksQuery request, CancellationToken cancellationToken)
    {
        Guard.Against.NullOrEmpty(_currentUser.Id, nameof(_currentUser.Id));

        var query = _context.Decks
            .Where(d => d.UserId == _currentUser.Id)
            .OrderBy(d => d.Created)
                .ThenBy(d => d.Name)
            .Skip((request.PageNumber - 1) * request.PageSize)
            .Take(request.PageSize)
            .AsNoTracking()
            .Select(d => new DeckListItemDto(
                d.Id,
                d.Name,
                d.Description,
                d.Created,
                d.Cards.Count
            ));

        return await PaginatedList<DeckListItemDto>.CreateAsync(query, request.PageNumber, request.PageSize, cancellationToken);
    }
}
