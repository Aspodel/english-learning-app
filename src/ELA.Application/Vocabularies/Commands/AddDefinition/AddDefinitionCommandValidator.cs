namespace ELA;

public class AddDefinitionCommandValidator : AbstractValidator<AddDefinitionCommand>
{
    public AddDefinitionCommandValidator()
    {
        RuleFor(d => d.VocabularyId)
            .NotNull().WithMessage("VocabularyId is required.")
            .GreaterThan(0).WithMessage("VocabularyId must be greater than 0.");

        RuleFor(d => d.Meaning)
            .NotEmpty().WithMessage("Meaning is required.");

        RuleFor(d => d.Translation)
            .NotEmpty().WithMessage("Translation is required.");

        RuleFor(d => d.PartOfSpeech)
            .NotEmpty().WithMessage("Part of speech is required.");
    }
}