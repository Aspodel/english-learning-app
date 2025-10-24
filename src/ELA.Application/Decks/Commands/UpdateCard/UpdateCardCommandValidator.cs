namespace ELA;

public class UpdateCardCommandValidator : AbstractValidator<UpdateCardCommand>
{
    public UpdateCardCommandValidator()
    {
        RuleFor(c => c.DeckId)
            .NotEmpty().WithMessage("DeckId cannot be empty.")
            .GreaterThan(0).WithMessage("DeckId must be greater than 0.");

        RuleFor(c => c.CardId)
            .NotEmpty().WithMessage("CardId cannot be empty.")
            .GreaterThan(0).WithMessage("CardId must be greater than 0.");

        RuleFor(c => c.Front)
            .NotEmpty().WithMessage("Front card text cannot be empty.")
            .MaximumLength(250).WithMessage("Front card text must not exceed 250 characters.");

        RuleFor(c => c.Back)
            .NotEmpty().WithMessage("Back card text cannot be empty.")
            .MaximumLength(500).WithMessage("Back card text must not exceed 500 characters.");
    }
}