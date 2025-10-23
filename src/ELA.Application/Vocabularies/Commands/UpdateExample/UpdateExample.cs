namespace ELA;

public record UpdateExampleCommand(int VocabularyId, int DefinitionId, int ExampleId, string Text, string? Translation) : IRequest<Unit>;

public class UpdateExampleCommandHandler : IRequestHandler<UpdateExampleCommand, Unit>
{
    private readonly IApplicationDbContext _context;

    public UpdateExampleCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(UpdateExampleCommand request, CancellationToken cancellationToken)
    {
        var vocab = await _context.Vocabularies
            .Include(v => v.Definitions)
                .ThenInclude(d => d.Examples)
            .FirstOrDefaultAsync(v => v.Id == request.VocabularyId, cancellationToken);

        Guard.Against.NotFound(request.VocabularyId, vocab);

        var definition = vocab.Definitions.FirstOrDefault(d => d.Id == request.DefinitionId);
        Guard.Against.NotFound(request.DefinitionId, definition);

        definition.UpdateExample(request.ExampleId, request.Text, request.Translation);

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}