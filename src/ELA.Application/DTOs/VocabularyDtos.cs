namespace ELA;

public sealed record AddVocabularyDto
(
    string Text,
    string IPA
);

public sealed record VocabularyDto
(
    Guid Id,
    string Text,
    string IPA
);
