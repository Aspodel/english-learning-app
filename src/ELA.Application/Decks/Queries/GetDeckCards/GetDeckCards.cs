using ELA.Decks.Dtos;

namespace ELA;

public record GetDeckCardsQuery(
    int DeckId,
    int PageNumber = 1,
    int PageSize = 10
) : IRequest<PaginatedList<CardDto>>;

public class GetDeckCardsQueryHandler : IRequestHandler<GetDeckCardsQuery, PaginatedList<CardDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public GetDeckCardsQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    public async Task<PaginatedList<CardDto>> Handle(GetDeckCardsQuery request, CancellationToken cancellationToken)
    {
        Guard.Against.NullOrEmpty(_currentUser.Id, nameof(_currentUser.Id));

        var query = _context.Cards
            .Where(c => c.DeckId == request.DeckId)
            .OrderBy(c => c.Created)
            .Skip((request.PageNumber - 1) * request.PageSize)
            .Take(request.PageSize)
            .AsNoTracking()
            .Select(c => new CardDto(
                c.Id,
                c.Front,
                c.Back,
                c.NextReview,
                c.Suspended,
                c.Created
            ));

        return await PaginatedList<CardDto>.CreateAsync(query, request.PageNumber, request.PageSize, cancellationToken);
    }
}
