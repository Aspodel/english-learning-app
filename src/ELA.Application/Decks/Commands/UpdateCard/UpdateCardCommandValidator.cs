namespace ELA;

public class UpdateCardCommandValidator : AbstractValidator<UpdateCardCommand>
{
    public UpdateCardCommandValidator()
    {
        RuleFor(c => c.DeckId)
            .GreaterThan(0).WithMessage("DeckId must be greater than 0.");

        RuleFor(c => c.CardId)
            .GreaterThan(0).WithMessage("CardId must be greater than 0.");

        RuleFor(c => c.NewFront)
            .NotEmpty().WithMessage("NewFront cannot be empty.");

        RuleFor(c => c.NewBack)
            .NotEmpty().WithMessage("NewBack cannot be empty.");
    }
}