namespace ELA.Vocabularies.Dtos;

public record ExampleDto(
    int Id,
    string Text,
    string? Translation
);

public record CreateExampleDto(
    string Text,
    string? Translation
);

public record UpdateExampleDto(
    int? Id,
    string Text,
    string? Translation
);