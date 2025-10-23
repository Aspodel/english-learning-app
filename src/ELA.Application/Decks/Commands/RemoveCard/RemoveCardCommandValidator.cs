namespace ELA;

public class RemoveCardCommandValidator : AbstractValidator<RemoveCardCommand>
{
    public RemoveCardCommandValidator()
    {
        RuleFor(c => c.DeckId)
            .NotEmpty().WithMessage("Deck Id is required.")
            .GreaterThan(0).WithMessage("Deck Id must be greater than zero.");

        RuleFor(c => c.CardId)
            .NotEmpty().WithMessage("Card Id is required.")
            .GreaterThan(0).WithMessage("Card Id must be greater than zero.");
    }
}