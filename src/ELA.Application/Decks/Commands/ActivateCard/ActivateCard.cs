namespace ELA;

public record ActivateCardCommand(int CardId) : IRequest<Unit>;

public class ActivateCardCommandHandler : IRequestHandler<ActivateCardCommand, Unit>
{
    private readonly IApplicationDbContext _context;

    public ActivateCardCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(ActivateCardCommand request, CancellationToken cancellationToken)
    {
        var card = await _context.Cards.FirstOrDefaultAsync(c => c.Id == request.CardId, cancellationToken);

        Guard.Against.NotFound(request.CardId, card);

        card.Activate();

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}