namespace ELA;

public class CreateDeckCommandValidator : AbstractValidator<CreateDeckCommand>
{
    public CreateDeckCommandValidator()
    {
        RuleFor(d => d.Name)
            .NotEmpty().WithMessage("Deck name is required.")
            .MaximumLength(250).WithMessage("Deck name must not exceed 250 characters.");

        RuleFor(d => d.Description)
            .MaximumLength(500).WithMessage("Description must not exceed 500 characters.");
    }
}