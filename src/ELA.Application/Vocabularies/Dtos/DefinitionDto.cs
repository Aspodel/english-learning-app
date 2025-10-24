namespace ELA.Vocabularies.Dtos;

public record DefinitionDto(
    int Id,
    string Meaning,
    string? Translation,
    string? PartOfSpeech,
    List<ExampleDto> Examples
);

public record CreateDefinitionDto(
    string Meaning,
    string? Translation,
    string? PartOfSpeech,
    List<CreateExampleDto>? Examples
);

public record UpdateDefinitionDto(
    int? Id,
    string Meaning,
    string? Translation,
    string? PartOfSpeech,
    List<UpdateExampleDto>? Examples
);