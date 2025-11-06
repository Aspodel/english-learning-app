using ELA.Vocabularies.Dtos;

namespace ELA;

public record CreateVocabularyCommand(
    string Text,
    string? IPA,
    List<CreateDefinitionDto>? Definitions
) : IRequest<VocabularyDto>;

public class CreateVocabularyCommandHandler : IRequestHandler<CreateVocabularyCommand, VocabularyDto>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public CreateVocabularyCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    public async Task<VocabularyDto> Handle(CreateVocabularyCommand request, CancellationToken cancellationToken)
    {
        Guard.Against.NullOrEmpty(_currentUser.Id, nameof(_currentUser.Id));

        var vocabulary = new Vocabulary(request.Text, _currentUser.Id, request.IPA);

        if (request.Definitions?.Count > 0)
        {
            foreach (var def in request.Definitions)
            {
                var partOfSpeech = def.PartOfSpeech is not null
                    ? PartOfSpeech.From(def.PartOfSpeech)
                    : null;

                var definition = vocabulary.AddDefinition(def.Meaning, def.Translation, partOfSpeech);

                if (def.Examples?.Count > 0)
                {
                    definition.AddExamples(def.Examples.Select(e => (e.Text, e.Translation)));
                }
            }
        }

        _context.Vocabularies.Add(vocabulary);
        await _context.SaveChangesAsync(cancellationToken);

        return new VocabularyDto(
            vocabulary.Id,
            vocabulary.Text,
            vocabulary.IPA,
            vocabulary.Definitions.Select(d => new DefinitionDto(
                d.Id,
                d.Meaning,
                d.Translation,
                d.PartOfSpeech?.Name,
                d.Examples.Select(e => new ExampleDto(e.Id, e.Text, e.Translation)).ToList()
            )).ToList()
        );
    }
}