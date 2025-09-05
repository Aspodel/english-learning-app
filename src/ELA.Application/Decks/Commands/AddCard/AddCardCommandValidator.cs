namespace ELA;

public class AddCardCommandValidator : AbstractValidator<AddCardCommand>
{
    public AddCardCommandValidator()
    {
        RuleFor(c => c.DeckId).GreaterThan(0).WithMessage("DeckId must be greater than 0.");

        RuleFor(c => c.Front).NotEmpty().WithMessage("Front text is required.");
        
        RuleFor(c => c.Back).NotEmpty().WithMessage("Back text is required.");
    }
}