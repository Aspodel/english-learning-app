using ELA.Decks.Dtos;

namespace ELA;

public record GetDueCardsForReviewQuery(string UserId) : IRequest<List<CardDto>>;

public class GetDueCardsForReviewQueryHandler : IRequestHandler<GetDueCardsForReviewQuery, List<CardDto>>
{
    private readonly IApplicationDbContext _context;

    public GetDueCardsForReviewQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<CardDto>> Handle(GetDueCardsForReviewQuery request, CancellationToken cancellationToken)
    {
        return await _context.Cards
            .Where(c => c.Deck!.UserId == request.UserId &&
                        !c.Suspended &&
                        c.NextReview <= DateTimeOffset.UtcNow)
            .OrderBy(c => c.NextReview)
            .Select(c => new CardDto(
                c.Id,
                c.Front,
                c.Back,
                c.NextReview,
                c.Suspended
            ))
            .ToListAsync(cancellationToken);
    }
}
