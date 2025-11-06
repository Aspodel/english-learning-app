using ELA.Decks.Dtos;

namespace ELA;

public record AddCardsCommand(int DeckId, List<AddCardDto> Cards) : IRequest<List<int>>;

public class AddCardsCommandHandler : IRequestHandler<AddCardsCommand, List<int>>
{
    private readonly IApplicationDbContext _context;

    public AddCardsCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<int>> Handle(AddCardsCommand request, CancellationToken cancellationToken)
    {
        var deck = await _context.Decks
            .Include(d => d.Cards)
            .FirstOrDefaultAsync(d => d.Id == request.DeckId, cancellationToken);

        Guard.Against.NotFound(request.DeckId, deck);
        
        var newCards = request.Cards.Select(c => (c.Front, c.Back));
        var addedCards = deck.AddCards(newCards);

        await _context.SaveChangesAsync(cancellationToken);

        return addedCards.Select(c => c.Id).ToList();
    }
}
