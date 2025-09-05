namespace ELA;

public class RenameDeckCommandValidator : AbstractValidator<RenameDeckCommand>
{
    public RenameDeckCommandValidator()
    {
        RuleFor(d => d.Id)
            .GreaterThan(0)
            .WithMessage("Deck ID must be greater than zero.");

        RuleFor(d => d.NewName)
            .NotEmpty().WithMessage("New deck name must not be empty.")
            .MaximumLength(200).WithMessage("New deck name must not exceed 200 characters.");
    }
}