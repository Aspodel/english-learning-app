namespace ELA;

public sealed record AddCardDto
(
    int QualityRating
);

public sealed record CardDto
(
    Guid Id,
    Guid DefinitionId,
    Guid UserId,
    int Interval,
    double EaseFactor,
    int Repetition,
    DateTimeOffset NextReview,
    DateTimeOffset? LastReview
);


public sealed record ReviewCardDto(int QualityRating, DateTimeOffset? ReviewDate = null);
