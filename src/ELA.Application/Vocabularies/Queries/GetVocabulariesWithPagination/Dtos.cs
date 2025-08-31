namespace ELA.Application.Vocabularies.Queries.GetVocabulariesWithPagination;

public sealed record VocabularyDto
{
    public int Id { get; init; }
    public string Text { get; init; } = string.Empty;
    public string IPA { get; init; } = string.Empty;
    public DateTimeOffset Created { get; init; }
}