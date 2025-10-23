namespace ELA;

public class AddDefinitionCommandValidator : AbstractValidator<AddDefinitionCommand>
{
    public AddDefinitionCommandValidator()
    {
        RuleFor(d => d.VocabularyId)
            .NotNull().WithMessage("VocabularyId is required.")
            .GreaterThan(0).WithMessage("VocabularyId must be greater than 0.");

        RuleFor(d => d.Meaning)
            .NotEmpty().WithMessage("Meaning is required.")
            .MaximumLength(500).WithMessage("Meaning cannot exceed 500 characters.");

        RuleFor(d => d.Translation)
            .MaximumLength(500).WithMessage("Translation cannot exceed 500 characters.");

        RuleFor(d => d.PartOfSpeech)
            .MaximumLength(50).WithMessage("Part of Speech cannot exceed 50 characters.");
    }
}