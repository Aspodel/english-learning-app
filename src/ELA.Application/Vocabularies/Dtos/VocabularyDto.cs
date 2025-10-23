namespace ELA.Vocabularies.Dtos;

public record VocabularyDto(
    int Id,
    string Text,
    string? IPA,
    List<DefinitionDto> Definitions
);

public record VocabularyListItemDto(
    int Id,
    string Text,
    string? IPA,
    int DefinitionCount,
    DateTimeOffset Created,
    List<PartOfSpeechDto> PartsOfSpeech
);

public record PartOfSpeechDto(string Name, string Abbreviation);
