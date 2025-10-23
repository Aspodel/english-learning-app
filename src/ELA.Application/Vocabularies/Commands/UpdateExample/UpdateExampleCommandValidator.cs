namespace ELA;

public class UpdateExampleCommandValidator : AbstractValidator<UpdateExampleCommand>
{
    public UpdateExampleCommandValidator()
    {
        RuleFor(e => e.VocabularyId)
            .NotEmpty().WithMessage("Vocabulary Id is required.")
            .GreaterThan(0).WithMessage("Vocabulary Id must be greater than 0.");

        RuleFor(e => e.DefinitionId)
            .NotEmpty().WithMessage("Definition Id is required.")
            .GreaterThan(0).WithMessage("Definition Id must be greater than 0.");

        RuleFor(e => e.ExampleId)
            .NotEmpty().WithMessage("Example Id is required.")
            .GreaterThan(0).WithMessage("Example Id must be greater than 0.");

        RuleFor(e => e.Text)
            .NotEmpty().WithMessage("Text is required.")
            .MaximumLength(500).WithMessage("Text must not exceed 500 characters.");
            
        RuleFor(e => e.Translation)
            .MaximumLength(500).WithMessage("Translation must not exceed 500 characters.");
    }
}