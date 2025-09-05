using ELA.Decks.Dtos;

namespace ELA;

public record GetDeckByIdQuery(int Id) : IRequest<DeckDto>;


public class GetDeckByIdQueryHandler : IRequestHandler<GetDeckByIdQuery, DeckDto>
{
    private readonly IApplicationDbContext _context;

    public GetDeckByIdQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<DeckDto> Handle(GetDeckByIdQuery request, CancellationToken cancellationToken)
    {
        var deck = await _context.Decks
            .Where(d => d.Id == request.Id)
            .Select(d => new DeckDto(
                d.Id,
                d.Name,
                d.Created,
                d.Cards.Select(c => new CardDto(
                    c.Id,
                    c.Front,
                    c.Back,
                    c.NextReview,
                    c.Suspended
                )).ToList()
            ))
            .FirstOrDefaultAsync(cancellationToken);

        Guard.Against.NotFound(request.Id, deck);

        return deck;
    }
}
