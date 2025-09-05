namespace ELA;

public class SuspendCardCommandValidator : AbstractValidator<SuspendCardCommand>
{
    public SuspendCardCommandValidator()
    {
        RuleFor(c => c.CardId)
            .GreaterThan(0).WithMessage("CardId must be greater than 0.");
    }
}