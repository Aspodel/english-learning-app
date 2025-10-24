namespace ELA;

public record UpdateCardCommand(int DeckId, int CardId, string Front, string Back) : IRequest<Unit>;

public class UpdateCardCommandHandler : IRequestHandler<UpdateCardCommand, Unit>
{
    private readonly IApplicationDbContext _context;

    public UpdateCardCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(UpdateCardCommand request, CancellationToken cancellationToken)
    {
        var deck = await _context.Decks
            .Include(d => d.Cards)
            .FirstOrDefaultAsync(d => d.Id == request.DeckId, cancellationToken);

        Guard.Against.NotFound(request.DeckId, deck);

        deck.UpdateCard(request.CardId, request.Front, request.Back);

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}