namespace ELA;

public class VocabularyService
{
    private readonly IVocabularyRepository _vocabularyRepository;

    public VocabularyService(IVocabularyRepository vocabularyRepository)
    {
        _vocabularyRepository = vocabularyRepository;
    }

    public async Task<VocabularyDto> AddVocabularyAsync(AddVocabularyDto dto)
    {
        var vocab = new Vocabulary(dto.Text, dto.IPA);
        await _vocabularyRepository.AddAsync(vocab);
        return new VocabularyDto(vocab.Id, vocab.Text, vocab.IPA);
    }

    public async Task<DefinitionDto> AddDefinitionAsync(Guid vocabularyId, AddDefinitionDto dto)
    {
        var vocab = await _vocabularyRepository.GetByIdAsync(vocabularyId)
            ?? throw new Exception($"Vocabulary {vocabularyId} not found");

        var definition = vocab.AddDefinition(dto.Meaning, dto.Translation, dto.PartOfSpeech);
        await _vocabularyRepository.UpdateAsync(vocab);

        return new DefinitionDto(definition.Id, definition.Meaning, definition.Translation, definition.PartOfSpeech);
    }

    public async Task RemoveDefinitionAsync(Guid vocabularyId, Guid definitionId)
    {
        var vocab = await _vocabularyRepository.GetByIdAsync(vocabularyId)
            ?? throw new Exception($"Vocabulary {vocabularyId} not found");

        vocab.RemoveDefinition(definitionId);
        await _vocabularyRepository.UpdateAsync(vocab);
    }
}