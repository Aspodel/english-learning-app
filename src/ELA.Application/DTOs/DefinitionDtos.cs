namespace ELA;

public sealed record AddDefinitionDto
(
    string Meaning,
    string Translation,
    PartOfSpeech PartOfSpeech
);

public sealed record DefinitionDto
(
    Guid Id,
    string Meaning,
    string Translation,
    PartOfSpeech PartOfSpeech
);
