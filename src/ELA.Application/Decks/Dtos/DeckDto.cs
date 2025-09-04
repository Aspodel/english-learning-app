namespace ELA.Decks.Dtos;

public record DeckDto(
    int Id,
    string Name,
    DateTimeOffset Created,
    List<CardDto> Cards
);

public record DeckListItemDto(
    int Id,
    string Name,
    DateTimeOffset Created,
    int CardCount
);