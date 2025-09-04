using ELA.Decks.Dtos;

namespace ELA;

public record GetUserDecksQuery : IRequest<List<DeckListItemDto>>;

public class GetUserDecksQueryHandler : IRequestHandler<GetUserDecksQuery, List<DeckListItemDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public GetUserDecksQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    public async Task<List<DeckListItemDto>> Handle(GetUserDecksQuery request, CancellationToken cancellationToken)
    {
        Guard.Against.NotFound(_currentUser.Id ?? "Unknown", _currentUser.Id);
        
        return await _context.Decks
            .Where(d => d.UserId == _currentUser.Id)
            .OrderBy(d => d.Name)
            .Select(d => new DeckListItemDto(
                d.Id,
                d.Name,
                d.Created,
                d.Cards.Count
            ))
            .ToListAsync(cancellationToken);
    }
}
