namespace ELA;

public class RemoveDefinitionCommandValidator : AbstractValidator<RemoveDefinitionCommand>
{
    public RemoveDefinitionCommandValidator()
    {
        RuleFor(d => d.VocabularyId)
            .NotEmpty().WithMessage("Vocabulary Id is required.")
            .GreaterThan(0).WithMessage("Vocabulary Id must be greater than 0.");
            
        RuleFor(d => d.DefinitionId)
            .NotEmpty().WithMessage("Definition Id is required.")
            .GreaterThan(0).WithMessage("Definition Id must be greater than 0.");
    }
}