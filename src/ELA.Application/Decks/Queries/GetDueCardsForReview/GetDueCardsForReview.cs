using ELA.Decks.Dtos;

namespace ELA;

public record GetDueCardsForReviewQuery(int DeckId) : IRequest<List<CardDto>>;

public class GetDueCardsForReviewQueryHandler : IRequestHandler<GetDueCardsForReviewQuery, List<CardDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public GetDueCardsForReviewQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    public async Task<List<CardDto>> Handle(GetDueCardsForReviewQuery request, CancellationToken cancellationToken)
    {
        return await _context.Cards
            .Include(c => c.Deck)
            .Where(c => c.Deck!.Id == request.DeckId &&
                        c.Deck.UserId == _currentUser.Id &&
                        !c.Suspended &&
                        c.NextReview <= DateTimeOffset.UtcNow)
            .OrderBy(c => c.NextReview)
            .Select(c => new CardDto(
                c.Id,
                c.Front,
                c.Back,
                c.NextReview,
                c.Suspended,
                c.Created
            ))
            .ToListAsync(cancellationToken);
    }
}
