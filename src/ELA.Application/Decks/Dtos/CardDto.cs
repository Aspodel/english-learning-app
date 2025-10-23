namespace ELA.Decks.Dtos;

public record CardDto(
    int Id,
    string Front,
    string Back,
    DateTimeOffset NextReview,
    bool Suspended,
    DateTimeOffset Created
);