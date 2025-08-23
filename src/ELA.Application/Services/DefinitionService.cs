namespace ELA;

public class DefinitionService
{
    private readonly IVocabularyRepository _vocabularyRepository;

    public DefinitionService(IVocabularyRepository vocabularyRepository)
    {
        _vocabularyRepository = vocabularyRepository;
    }

    public async Task<ExampleDto> AddExampleAsync(Guid vocabularyId, Guid definitionId, AddExampleDto dto, CancellationToken cancellationToken = default)
    {
        var vocab = await _vocabularyRepository.GetByIdAsync(vocabularyId, cancellationToken)
            ?? throw new NotFoundException($"Vocabulary {vocabularyId} not found");

        var definition = vocab.Definitions.FirstOrDefault(d => d.Id == definitionId)
            ?? throw new NotFoundException($"Definition {definitionId} not found");

        definition.AddExample(dto.Text, dto.Translation);
        await _vocabularyRepository.UpdateAsync(vocab, cancellationToken);

        var example = definition.Examples.Last();
        return new ExampleDto(example.Id, example.Text, example.Translation);
    }

    public async Task RemoveExampleAsync(Guid vocabularyId, Guid definitionId, Guid exampleId, CancellationToken cancellationToken = default)
    {
        var vocab = await _vocabularyRepository.GetByIdAsync(vocabularyId, cancellationToken)
            ?? throw new NotFoundException($"Vocabulary {vocabularyId} not found");

        var definition = vocab.Definitions.FirstOrDefault(d => d.Id == definitionId)
            ?? throw new NotFoundException($"Definition {definitionId} not found");

        definition.RemoveExample(exampleId);
        await _vocabularyRepository.UpdateAsync(vocab);
    }

    public async Task UpdateExampleAsync(Guid vocabularyId, Guid definitionId, Guid exampleId, AddExampleDto dto, CancellationToken cancellationToken = default)
    {
        var vocab = await _vocabularyRepository.GetByIdAsync(vocabularyId, cancellationToken)
                   ?? throw new NotFoundException($"Vocabulary {vocabularyId} not found.");

        var definition = vocab.Definitions.FirstOrDefault(d => d.Id == definitionId)
                         ?? throw new NotFoundException($"Definition {definitionId} not found.");

        definition.UpdateExample(exampleId, dto.Text, dto.Translation);
        await _vocabularyRepository.UpdateAsync(vocab, cancellationToken);
    }
}
