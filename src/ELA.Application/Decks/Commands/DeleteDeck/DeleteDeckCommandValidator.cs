namespace ELA;

public class DeleteDeckCommandValidator : AbstractValidator<DeleteDeckCommand>
{
    public DeleteDeckCommandValidator()
    {
        RuleFor(d => d.Id)
            .GreaterThan(0).WithMessage("Deck Id must be greater than zero.");
    }
}