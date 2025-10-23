namespace ELA;

public class AddExampleCommandValidator : AbstractValidator<AddExampleCommand>
{
    public AddExampleCommandValidator()
    {
        RuleFor(e => e.VocabularyId)
            .NotEmpty().WithMessage("Vocabulary Id is required.")
            .GreaterThan(0).WithMessage("Vocabulary Id must be greater than 0.");

        RuleFor(e => e.DefinitionId)
            .NotEmpty().WithMessage("Definition Id is required.")
            .GreaterThan(0).WithMessage("Definition Id must be greater than 0.");

        RuleFor(e => e.Text)
            .NotEmpty().WithMessage("Text is required.")
            .MaximumLength(500).WithMessage("Text cannot exceed 500 characters.");

        RuleFor(e => e.Translation)
            .MaximumLength(500).WithMessage("Translation cannot exceed 500 characters.");
    }
}