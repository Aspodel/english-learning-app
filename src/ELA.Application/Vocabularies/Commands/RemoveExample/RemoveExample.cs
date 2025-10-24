namespace ELA;

public record RemoveExampleCommand(int VocabularyId, int DefinitionId, int ExampleId) : IRequest<Unit>;

public class RemoveExampleCommandHandler : IRequestHandler<RemoveExampleCommand, Unit>
{
    private readonly IApplicationDbContext _context;

    public RemoveExampleCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(RemoveExampleCommand request, CancellationToken cancellationToken)
    {
        var vocab = await _context.Vocabularies
            .Include(v => v.Definitions)
                .ThenInclude(d => d.Examples)
            .FirstOrDefaultAsync(v => v.Id == request.VocabularyId, cancellationToken);
        Guard.Against.NotFound(request.VocabularyId, vocab);

        var definition = vocab.Definitions.FirstOrDefault(d => d.Id == request.DefinitionId);
        Guard.Against.NotFound(request.DefinitionId, definition);

        var example = definition.Examples.FirstOrDefault(e => e.Id == request.ExampleId);
        Guard.Against.NotFound(request.ExampleId, example);

        definition.RemoveExample(request.ExampleId);

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}