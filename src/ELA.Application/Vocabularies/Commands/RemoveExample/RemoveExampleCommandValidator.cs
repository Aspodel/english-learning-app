namespace ELA;

public class RemoveExampleCommandValidator : AbstractValidator<RemoveExampleCommand>
{
    public RemoveExampleCommandValidator()
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
    }
}