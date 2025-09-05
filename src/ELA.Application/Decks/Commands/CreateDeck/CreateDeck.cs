namespace ELA;

public record CreateDeckCommand(string Name, string UserId) : IRequest<int>;

public class CreateDeckCommandHandler : IRequestHandler<CreateDeckCommand, int>
{
    private readonly IApplicationDbContext _context;

    public CreateDeckCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> Handle(CreateDeckCommand request, CancellationToken cancellationToken)
    {
        var deck = new Deck(request.Name, request.UserId);

        _context.Decks.Add(deck);
        await _context.SaveChangesAsync(cancellationToken);

        return deck.Id;
    }
}