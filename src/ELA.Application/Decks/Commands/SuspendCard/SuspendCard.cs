namespace ELA;

public record SuspendCardCommand(int CardId) : IRequest<Unit>;

public class SuspendCardCommandHandler : IRequestHandler<SuspendCardCommand, Unit>
{
    private readonly IApplicationDbContext _context;

    public SuspendCardCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(SuspendCardCommand request, CancellationToken cancellationToken)
    {
        var card = await _context.Cards.FirstOrDefaultAsync(c => c.Id == request.CardId, cancellationToken);

        Guard.Against.NotFound(request.CardId, card);

        card.Suspend();

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}