namespace ELA;

public class CardService
{
    private readonly ICardRepository _cardRepository;
    private readonly IVocabularyRepository _vocabularyRepository;

    public CardService(ICardRepository cardRepository, IVocabularyRepository vocabularyRepository)
    {
        _cardRepository = cardRepository;
        _vocabularyRepository = vocabularyRepository;
    }

    public async Task<CardDto> AddCardAsync(Guid vocabularyId, Guid definitionId, Guid userId)
    {
        var vocab = await _vocabularyRepository.GetByIdAsync(vocabularyId)
            ?? throw new Exception($"Vocabulary {vocabularyId} not found");

        var definition = vocab.Definitions.FirstOrDefault(d => d.Id == definitionId)
            ?? throw new Exception($"Definition {definitionId} not found");

        definition.AddCard(userId);
        await _vocabularyRepository.UpdateAsync(vocab);

        var card = definition.Card!;
        return new CardDto(card.Id, card.DefinitionId, card.Interval, card.EaseFactor, card.Repetition, card.NextReview);
    }

    public async Task<CardDto> ReviewCardAsync(Guid cardId, ReviewCardDto dto, DateTimeOffset reviewDate)
    {
        var card = await _cardRepository.GetByIdAsync(cardId)
            ?? throw new Exception($"Card {cardId} not found");

        card.Review(dto.QualityRating, reviewDate);
        await _cardRepository.UpdateAsync(card);

        return new CardDto(card.Id, card.DefinitionId, card.Interval, card.EaseFactor, card.Repetition, card.NextReview);
    }

    public async Task SuspendCardAsync(Guid cardId)
    {
        var card = await _cardRepository.GetByIdAsync(cardId)
            ?? throw new Exception($"Card {cardId} not found");

        card.Suspend();
        await _cardRepository.UpdateAsync(card);
    }

    public async Task ActivateCardAsync(Guid cardId)
    {
        var card = await _cardRepository.GetByIdAsync(cardId)
            ?? throw new Exception($"Card {cardId} not found");

        card.Activate();
        await _cardRepository.UpdateAsync(card);
    }
}
