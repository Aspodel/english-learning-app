using ELA.Vocabularies.Dtos;

namespace ELA;

public record GetVocabulariesWithPaginationQuery(
    int PageNumber = 1,
    int PageSize = 10
) : IRequest<PaginatedList<VocabularyListItemDto>>;

public class GetVocabulariesWithPaginationQueryHandler : IRequestHandler<GetVocabulariesWithPaginationQuery, PaginatedList<VocabularyListItemDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public GetVocabulariesWithPaginationQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    public async Task<PaginatedList<VocabularyListItemDto>> Handle(GetVocabulariesWithPaginationQuery request, CancellationToken cancellationToken)
    {
        
        var query = _context.Vocabularies
            .Where(v => v.UserId == _currentUser.Id)
            .OrderBy(v => v.Created)
                .ThenBy(v => v.Text)
            .Skip((request.PageNumber - 1) * request.PageSize)
            .Take(request.PageSize)
            .AsNoTracking()
            .Select(v => new VocabularyListItemDto(
                v.Id,
                v.Text,
                v.IPA,
                v.Definitions.Count,
                v.Created,
                v.Definitions.Where(d => d.PartOfSpeech != null)
                            .Select(d => new PartOfSpeechDto(
                                    d.PartOfSpeech!.Name,
                                    d.PartOfSpeech.Abbreviation))
                            .Distinct()
                            .ToList()
            ));

        return await PaginatedList<VocabularyListItemDto>.CreateAsync(query, request.PageNumber, request.PageSize, cancellationToken);
    }
}