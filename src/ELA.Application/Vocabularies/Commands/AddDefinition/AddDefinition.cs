using ELA.Vocabularies.Dtos;

namespace ELA;

public record AddDefinitionCommand(
    int VocabularyId,
    string Meaning,
    string? Translation,
    string? PartOfSpeech,
    List<CreateExampleDto>? Examples) : IRequest<int>;

public class AddDefinitionCommandHandler : IRequestHandler<AddDefinitionCommand, int>
{
    private readonly IApplicationDbContext _context;

    public AddDefinitionCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> Handle(AddDefinitionCommand request, CancellationToken cancellationToken)
    {
        var vocab = await _context.Vocabularies
            .Include(v => v.Definitions)
            .FirstOrDefaultAsync(v => v.Id == request.VocabularyId, cancellationToken);

        Guard.Against.NotFound(request.VocabularyId, vocab);

        var partOfSpeech = request.PartOfSpeech is not null
            ? PartOfSpeech.From(request.PartOfSpeech)
            : null;
            
        var definition = vocab.AddDefinition(request.Meaning, request.Translation, partOfSpeech);

        if (request.Examples is not null && request.Examples.Any())
        {
            foreach (var example in request.Examples)
            {
                definition.AddExample(example.Text, example.Translation);
            }
        }

        await _context.SaveChangesAsync(cancellationToken);

        return definition.Id;
    }
}
