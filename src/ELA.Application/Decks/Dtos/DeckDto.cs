namespace ELA.Decks.Dtos;

public record DeckDto(
    int Id,
    string Name,
    string? Description,
    DateTimeOffset Created,
    List<CardDto> Cards
);

public record DeckListItemDto(
    int Id,
    string Name,
    string? Description,
    DateTimeOffset Created,
    int CardCount
);