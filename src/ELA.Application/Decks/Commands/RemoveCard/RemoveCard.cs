namespace ELA;

public record RemoveCardCommand(int DeckId, int CardId) : IRequest<Unit>;

public class RemoveCardCommandHandler : IRequestHandler<RemoveCardCommand, Unit>
{
    private readonly IApplicationDbContext _context;

    public RemoveCardCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(RemoveCardCommand request, CancellationToken cancellationToken)
    {
        var deck = await _context.Decks
            .Include(d => d.Cards)
            .FirstOrDefaultAsync(d => d.Id == request.DeckId, cancellationToken);
        Guard.Against.NotFound(request.DeckId, deck);

        var card = deck.Cards.FirstOrDefault(c => c.Id == request.CardId);
        Guard.Against.NotFound(request.CardId, card);

        deck.RemoveCard(request.CardId);

        _context.Cards.Remove(card);

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}