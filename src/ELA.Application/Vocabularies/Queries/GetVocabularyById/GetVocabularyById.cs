using ELA.Application.Vocabularies.Queries.GetVocabularyById;

namespace ELA;

public record GetVocabularyByIdQuery(int Id) : IRequest<VocabularyDto>;

public class GetVocabularyByIdQueryHandler : IRequestHandler<GetVocabularyByIdQuery, VocabularyDto>
{
    private readonly IApplicationDbContext _context;

    public GetVocabularyByIdQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<VocabularyDto> Handle(GetVocabularyByIdQuery request, CancellationToken cancellationToken)
    {
        var vocabulary = await _context.Vocabularies
            .AsNoTracking()
            .Include(v => v.Definitions)
                .ThenInclude(d => d.Examples)
            .FirstOrDefaultAsync(v => v.Id == request.Id, cancellationToken);

        Guard.Against.Null(vocabulary, nameof(vocabulary),
            $"Vocabulary with Id {request.Id} was not found.");

        return new VocabularyDto
        {
            Id = vocabulary.Id,
            Text = vocabulary.Text,
            IPA = vocabulary.IPA,
            Definitions = vocabulary.Definitions.Select(d => new DefinitionDto
            {
                Id = d.Id,
                Meaning = d.Meaning,
                Translation = d.Translation,
                PartOfSpeech = d.PartOfSpeech,
                Examples = d.Examples.Select(e => new ExampleDto
                {
                    Id = e.Id,
                    Text = e.Text,
                    Translation = e.Translation
                }).ToList()
            }).ToList()
        };
    }
}