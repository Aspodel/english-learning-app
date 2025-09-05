namespace ELA;

public class RemoveCardCommandValidator : AbstractValidator<RemoveCardCommand>
{
    public RemoveCardCommandValidator()
    {
        RuleFor(c => c.DeckId)
            .GreaterThan(0).WithMessage("DeckId must be greater than 0.");

        RuleFor(c => c.CardId)
            .GreaterThan(0).WithMessage("CardId must be greater than 0.");
    }
}