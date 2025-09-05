namespace ELA;

public class ActivateCardCommandValidator : AbstractValidator<ActivateCardCommand>
{
    public ActivateCardCommandValidator()
    {
        RuleFor(c => c.CardId)
            .GreaterThan(0).WithMessage("CardId must be greater than 0.");
    }
}