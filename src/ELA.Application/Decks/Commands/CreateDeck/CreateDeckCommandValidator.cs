namespace ELA;

public class CreateDeckCommandValidator : AbstractValidator<CreateDeckCommand>
{
    public CreateDeckCommandValidator()
    {
        RuleFor(d => d.Name)
            .NotEmpty().WithMessage("Deck name is required.")
            .MaximumLength(200).WithMessage("Deck name must not exceed 200 characters.");
            
        RuleFor(d => d.UserId)
            .NotEmpty().WithMessage("User ID is required.");
    }
}