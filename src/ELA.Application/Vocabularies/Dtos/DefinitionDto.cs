namespace ELA.Vocabularies.Dtos;

public record DefinitionDto(
    int Id,
    string Meaning,
    string Translation,
    string PartOfSpeech,
    List<ExampleDto> Examples
);
