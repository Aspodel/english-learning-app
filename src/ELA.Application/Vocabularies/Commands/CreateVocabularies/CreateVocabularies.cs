using ELA.Vocabularies.Dtos;

namespace ELA;

public record CreateVocabulariesCommand(List<CreateVocabularyCommand> Vocabularies) : IRequest<List<VocabularyDto>>;

public class CreateVocabulariesCommandHandler : IRequestHandler<CreateVocabulariesCommand, List<VocabularyDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public CreateVocabulariesCommandHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    public async Task<List<VocabularyDto>> Handle(CreateVocabulariesCommand request, CancellationToken cancellationToken)
    {
        Guard.Against.NullOrEmpty(_currentUser.Id, nameof(_currentUser.Id));

        var vocabularies = new List<Vocabulary>(request.Vocabularies.Count);

        foreach (var dto in request.Vocabularies)
        {
            var vocabulary = new Vocabulary(dto.Text, _currentUser.Id, dto.IPA);

            if (dto.Definitions is not null)
            {
                foreach (var def in dto.Definitions)
                {
                    var partOfSpeech = def.PartOfSpeech is not null
                        ? PartOfSpeech.From(def.PartOfSpeech)
                        : null;

                    var definition = vocabulary.AddDefinition(def.Meaning, def.Translation, partOfSpeech);

                    if (def.Examples is not null)
                    {
                        foreach (var ex in def.Examples)
                        {
                            definition.AddExample(ex.Text, ex.Translation);
                        }
                    }
                }
            }

            vocabularies.Add(vocabulary);
        }

        _context.Vocabularies.AddRange(vocabularies);
        await _context.SaveChangesAsync(cancellationToken);

        return vocabularies.Select(vocab => new VocabularyDto(
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
        )).ToList();
    }
}
