namespace ELA;

public record AddVocabularyDto
(
    string Text,
    string IPA
);

public record VocabularyDto
(
    Guid Id,
    string Text,
    string IPA
);
