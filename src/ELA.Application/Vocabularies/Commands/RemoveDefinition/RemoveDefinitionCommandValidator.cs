namespace ELA;

public class RemoveDefinitionCommandValidator : AbstractValidator<RemoveDefinitionCommand>
{
    public RemoveDefinitionCommandValidator()
    {
        RuleFor(d => d.VocabularyId)
            .GreaterThan(0).WithMessage("VocabularyId must be greater than 0.");
            
        RuleFor(d => d.DefinitionId)
            .GreaterThan(0).WithMessage("DefinitionId must be greater than 0.");
    }
}