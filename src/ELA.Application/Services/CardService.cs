namespace ELA;

public class CardService
{
    private readonly ICardRepository _cardRepository;
    private readonly IVocabularyRepository _vocabularyRepository;
    private readonly ISpacedRepetitionScheduler _scheduler;

    public CardService(ICardRepository cardRepository, IVocabularyRepository vocabularyRepository, ISpacedRepetitionScheduler scheduler)
    {
        _cardRepository = cardRepository;
        _vocabularyRepository = vocabularyRepository;
        _scheduler = scheduler;
    }

    public async Task<CardDto> AddCardAsync(Guid vocabularyId, Guid definitionId, Guid userId, CancellationToken cancellationToken = default)
    {
        var vocab = await _vocabularyRepository.GetByIdAsync(vocabularyId, cancellationToken)
            ?? throw new Exception($"Vocabulary {vocabularyId} not found");

        var definition = vocab.Definitions.FirstOrDefault(d => d.Id == definitionId)
            ?? throw new Exception($"Definition {definitionId} not found");

        definition.AddCard(userId);
        await _vocabularyRepository.UpdateAsync(vocab, cancellationToken);

        var card = definition.Card!;
        return new CardDto(card.Id, card.DefinitionId, userId, card.Interval, card.EaseFactor, card.Repetition, card.NextReview, card.LastReview);
    }

    public async Task<CardDto> ReviewCardAsync(Guid cardId, ReviewCardDto dto, CancellationToken cancellationToken = default)
    {
        var card = await _cardRepository.GetByIdAsync(cardId, cancellationToken)
            ?? throw new NotFoundException($"Card {cardId} not found");

        var reviewDate = dto.ReviewDate ?? DateTimeOffset.UtcNow;
        var result = _scheduler.Compute(card, dto.QualityRating, reviewDate);

        card.AddReviewResult(
            qualityRating: dto.QualityRating,
            reviewDate: reviewDate,
            newInterval: result.NewInterval,
            newEaseFactor: result.NewEaseFactor,
            newRepetition: result.NewRepetition,
            nextReview: result.NextReview
        );

        await _cardRepository.UpdateAsync(card, cancellationToken);
        return new CardDto(card.Id, card.DefinitionId, card.UserId, card.Interval, card.EaseFactor, card.Repetition, card.NextReview, card.LastReview);
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
