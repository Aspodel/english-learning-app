namespace ELA.Application.Vocabularies.Queries.GetVocabularyById;

public sealed record VocabularyDto
{
    public int Id { get; init; }
    public string Text { get; init; } = string.Empty;
    public string IPA { get; init; } = string.Empty;
    public IReadOnlyList<DefinitionDto> Definitions { get; init; } = [];
}

public sealed record DefinitionDto
{
    public int Id { get; init; }
    public string Meaning { get; init; } = string.Empty;
    public string Translation { get; init; } = string.Empty;
    public required PartOfSpeech PartOfSpeech { get; init; }
    public IReadOnlyList<ExampleDto> Examples { get; init; } = [];
}

public sealed record ExampleDto
{
    public int Id { get; init; }
    public string Text { get; init; } = string.Empty;
    public string Translation { get; init; } = string.Empty;
}