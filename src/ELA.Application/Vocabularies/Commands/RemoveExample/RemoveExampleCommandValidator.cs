namespace ELA;

public class RemoveExampleCommandValidator : AbstractValidator<RemoveExampleCommand>
{
    public RemoveExampleCommandValidator()
    {
        RuleFor(e => e.VocabularyId)
            .GreaterThan(0).WithMessage("VocabularyId must be greater than 0.");

        RuleFor(e => e.DefinitionId)
            .GreaterThan(0).WithMessage("DefinitionId must be greater than 0.");

        RuleFor(e => e.ExampleId)
            .GreaterThan(0).WithMessage("ExampleId must be greater than 0.");
    }
}