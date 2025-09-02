namespace ELA.Vocabularies.Dtos;

public record VocabularyDto(
    int Id,
    string Text,
    string IPA,
    List<DefinitionDto> Definitions
);

public record SummaryVocabularyDto(
    int Id,
    string Text,
    string IPA,
    DateTimeOffset Created,
    List<string> PartOfSpeech
);