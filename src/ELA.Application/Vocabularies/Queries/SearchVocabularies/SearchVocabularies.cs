using ELA.Vocabularies.Dtos;

namespace ELA;

public record SearchVocabulariesQuery(string UserId, string SearchText) : IRequest<List<VocabularyListItemDto>>;

public class SearchVocabulariesQueryHandler : IRequestHandler<SearchVocabulariesQuery, List<VocabularyListItemDto>>
{
    private readonly IApplicationDbContext _context;

    public SearchVocabulariesQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<VocabularyListItemDto>> Handle(SearchVocabulariesQuery request, CancellationToken cancellationToken)
    {
        return await _context.Vocabularies
            .Where(v => v.UserId == request.UserId &&
                        (v.Text.Contains(request.SearchText) ||
                         v.Definitions.Any(d => d.Meaning.Contains(request.SearchText) ||
                                                d.Translation.Contains(request.SearchText))))
            .OrderBy(v => v.Text)
            .Select(v => new VocabularyListItemDto(
                v.Id,
                v.Text,
                v.IPA,
                v.Definitions.Count,
                v.Created
            ))
            .ToListAsync(cancellationToken);
    }
}
