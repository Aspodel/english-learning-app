namespace ELA;

public class UpdateExampleCommandValidator : AbstractValidator<UpdateExampleCommand>
{
    public UpdateExampleCommandValidator()
    {
        RuleFor(e => e.VocabularyId)
            .GreaterThan(0).WithMessage("VocabularyId must be greater than 0.");

        RuleFor(e => e.DefinitionId)
            .GreaterThan(0).WithMessage("DefinitionId must be greater than 0.");

        RuleFor(e => e.ExampleId)
            .GreaterThan(0).WithMessage("ExampleId must be greater than 0.");

        RuleFor(e => e.Text)
            .NotEmpty().WithMessage("Text is required.");
            
        RuleFor(e => e.Translation)
            .NotEmpty().WithMessage("Translation is required.");
    }
}