namespace ELA;

public class VocabularyService
{
    private readonly IVocabularyRepository _vocabularyRepository;

    public VocabularyService(IVocabularyRepository vocabularyRepository)
    {
        _vocabularyRepository = vocabularyRepository;
    }

    public async Task<VocabularyDto> GetVocabularyByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var vocab = await _vocabularyRepository.GetByIdAsync(id, cancellationToken)
            ?? throw new NotFoundException($"Vocabulary {id} not found");

        return new VocabularyDto(vocab.Id, vocab.Text, vocab.IPA);
    }

    public async Task<IEnumerable<VocabularyDto>> GetAllVocabulariesAsync(CancellationToken cancellationToken = default)
    {
        var vocabularies = await _vocabularyRepository.GetAllAsync(cancellationToken);
        return vocabularies.Select(v => new VocabularyDto(v.Id, v.Text, v.IPA));
    }

    public async Task<VocabularyDto> AddVocabularyAsync(AddVocabularyDto dto, CancellationToken cancellationToken = default)
    {
        var vocab = new Vocabulary(dto.Text, dto.IPA);
        await _vocabularyRepository.AddAsync(vocab, cancellationToken);
        return new VocabularyDto(vocab.Id, vocab.Text, vocab.IPA);
    }

    public async Task<DefinitionDto> AddDefinitionAsync(Guid vocabularyId, AddDefinitionDto dto, CancellationToken cancellationToken = default)
    {
        var vocab = await _vocabularyRepository.GetByIdAsync(vocabularyId, cancellationToken)
            ?? throw new NotFoundException($"Vocabulary {vocabularyId} not found");

        var definition = vocab.AddDefinition(dto.Meaning, dto.Translation, dto.PartOfSpeech);
        await _vocabularyRepository.UpdateAsync(vocab, cancellationToken);

        return new DefinitionDto(definition.Id, definition.Meaning, definition.Translation, definition.PartOfSpeech);
    }

    public async Task RemoveDefinitionAsync(Guid vocabularyId, Guid definitionId, CancellationToken cancellationToken = default)
    {
        var vocab = await _vocabularyRepository.GetByIdAsync(vocabularyId, cancellationToken)
            ?? throw new NotFoundException($"Vocabulary {vocabularyId} not found");

        vocab.RemoveDefinition(definitionId);
        await _vocabularyRepository.UpdateAsync(vocab, cancellationToken);
    }

    public async Task UpdateDefinitionAsync(Guid vocabularyId, Guid definitionId, AddDefinitionDto dto, CancellationToken cancellationToken = default)
    {
        var vocab = await _vocabularyRepository.GetByIdAsync(vocabularyId, cancellationToken)
                   ?? throw new NotFoundException($"Vocabulary {vocabularyId} not found.");

        vocab.UpdateDefinition(definitionId, dto.Meaning, dto.Translation, dto.PartOfSpeech);
        await _vocabularyRepository.UpdateAsync(vocab, cancellationToken);
    }
}