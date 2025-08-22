namespace ELA;

public record AddDefinitionDto
(
    string Meaning,
    string Translation,
    PartOfSpeech PartOfSpeech
);

public record DefinitionDto
(
    Guid Id,
    string Meaning,
    string Translation,
    PartOfSpeech PartOfSpeech
);
