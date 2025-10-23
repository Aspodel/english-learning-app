using ELA.Vocabularies.Dtos;

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
            .Include(v => v.Definitions)
                .ThenInclude(d => d.Examples)
            .AsNoTracking()
            .FirstOrDefaultAsync(v => v.Id == request.Id, cancellationToken);

        Guard.Against.NotFound(request.Id, vocabulary);

        return new VocabularyDto(
            vocabulary.Id,
            vocabulary.Text,
            vocabulary.IPA,
            vocabulary.Definitions.Select(d => new DefinitionDto(
                d.Id,
                d.Meaning,
                d.Translation,
                d.PartOfSpeech?.Name,
                d.Examples.Select(e => new ExampleDto(
                    e.Id,
                    e.Text,
                    e.Translation
                )).ToList()
            )).ToList()
        );
    }
}