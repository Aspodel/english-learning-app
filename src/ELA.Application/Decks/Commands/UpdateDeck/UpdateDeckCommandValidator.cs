namespace ELA;

public class UpdateDeckCommandValidator : AbstractValidator<UpdateDeckCommand>
{
    public UpdateDeckCommandValidator()
    {
        RuleFor(d => d.Id)
            .NotEmpty().WithMessage("Id is required.")
            .GreaterThan(0).WithMessage("Id must be greater than zero.");

        RuleFor(d => d.NewName)
            .NotEmpty().WithMessage("New deck name must not be empty.")
            .MaximumLength(250).WithMessage("Deck name must not exceed 250 characters.");

        RuleFor(d => d.NewDescription)
            .MaximumLength(500).WithMessage("Description must not exceed 500 characters.");
    }
}