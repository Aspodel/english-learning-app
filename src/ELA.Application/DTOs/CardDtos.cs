namespace ELA;

public record AddCardDto
(
    int QualityRating
);

public record CardDto
(
    Guid Id,
    Guid DefinitionId,
    int Interval,
    double EaseFactor,
    int Repetitions,
    DateTimeOffset NextReview
);

public record ReviewCardDto(int QualityRating);
