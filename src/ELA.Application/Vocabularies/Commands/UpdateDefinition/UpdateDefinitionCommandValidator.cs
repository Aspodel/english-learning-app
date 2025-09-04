namespace ELA;

public class UpdateDefinitionCommandValidator : AbstractValidator<UpdateDefinitionCommand>
{
    public UpdateDefinitionCommandValidator()
    {
        RuleFor(d => d.VocabularyId)
            .GreaterThan(0).WithMessage("VocabularyId must be greater than 0.");

        RuleFor(d => d.DefinitionId)
            .GreaterThan(0).WithMessage("DefinitionId must be greater than 0.");

        RuleFor(d => d.Meaning)
            .NotEmpty().WithMessage("Meaning is required.");

        RuleFor(d => d.Translation)
            .NotEmpty().WithMessage("Translation is required.");

        RuleFor(d => d.PartOfSpeech)
            .NotEmpty().WithMessage("Part of speech is required.");
    }
}