namespace ELA;

public record AddExampleCommand(int VocabularyId, int DefinitionId, string Text, string Translation) : IRequest<int>;

public class AddExampleCommandHandler : IRequestHandler<AddExampleCommand, int>
{
    private readonly IApplicationDbContext _context;

    public AddExampleCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> Handle(AddExampleCommand request, CancellationToken cancellationToken)
    {
        var vocab = await _context.Vocabularies
            .Include(v => v.Definitions)
                .ThenInclude(d => d.Examples)
            .FirstOrDefaultAsync(v => v.Id == request.VocabularyId, cancellationToken);

        Guard.Against.NotFound(request.VocabularyId, vocab);

        var definition = vocab.Definitions.FirstOrDefault(d => d.Id == request.DefinitionId);
        Guard.Against.NotFound(request.DefinitionId, definition);

        definition.AddExample(request.Text, request.Translation);

        await _context.SaveChangesAsync(cancellationToken);

        // last added example Id
        return definition.Examples.Last().Id;
    }
}