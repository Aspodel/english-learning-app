namespace ELA;

public record AddCardCommand(int DeckId, string Front, string Back) : IRequest<int>;

public class AddCardCommandHandler : IRequestHandler<AddCardCommand, int>
{
    private readonly IApplicationDbContext _context;

    public AddCardCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> Handle(AddCardCommand request, CancellationToken cancellationToken)
    {
        var deck = await _context.Decks
            .Include(d => d.Cards)
            .FirstOrDefaultAsync(d => d.Id == request.DeckId, cancellationToken);

        Guard.Against.NotFound(request.DeckId, deck);

        var card = deck.AddCard(request.Front, request.Back);

        await _context.SaveChangesAsync(cancellationToken);

        return card.Id;
    }
}