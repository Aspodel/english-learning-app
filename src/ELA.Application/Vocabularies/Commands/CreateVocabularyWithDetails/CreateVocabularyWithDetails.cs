using ELA.Vocabularies.Dtos;

namespace ELA;

public record CreateVocabularyWithDetailsCommand(
    string Text,
    string? IPA,
    List<CreateDefinitionDto>? Definitions) : IRequest<VocabularyDto>;

public class CreateVocabularyWithDetailsCommandHandler
    : IRequestHandler<CreateVocabularyWithDetailsCommand, VocabularyDto>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public CreateVocabularyWithDetailsCommandHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    public async Task<VocabularyDto> Handle(CreateVocabularyWithDetailsCommand request, CancellationToken cancellationToken)
    {
        Guard.Against.NullOrEmpty(_currentUser.Id, nameof(_currentUser.Id));

        var vocab = new Vocabulary(request.Text, _currentUser.Id, request.IPA);

        if (request.Definitions is not null && request.Definitions.Any())
        {
            foreach (var def in request.Definitions)
            {
                var partOfSpeech = def.PartOfSpeech is not null
                    ? PartOfSpeech.From(def.PartOfSpeech)
                    : null;

                var definition = vocab.AddDefinition(def.Meaning, def.Translation, partOfSpeech);

                if (def.Examples is not null && def.Examples.Any())
                {
                    foreach (var ex in def.Examples)
                    {
                        definition.AddExample(ex.Text, ex.Translation);
                    }
                }
            }
        }

        _context.Vocabularies.Add(vocab);
        await _context.SaveChangesAsync(cancellationToken);

        return new VocabularyDto(
            vocab.Id,
            vocab.Text,
            vocab.IPA,
            vocab.Definitions.Select(d => new DefinitionDto(
                d.Id,
                d.Meaning,
                d.Translation,
                d.PartOfSpeech?.Name,
                d.Examples.Select(e => new ExampleDto(e.Id, e.Text, e.Translation)).ToList()
            )).ToList()
        );
    }
}
