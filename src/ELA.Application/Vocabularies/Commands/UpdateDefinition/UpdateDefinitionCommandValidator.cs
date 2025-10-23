namespace ELA;

public class UpdateDefinitionCommandValidator : AbstractValidator<UpdateDefinitionCommand>
{
    public UpdateDefinitionCommandValidator()
    {
        RuleFor(d => d.VocabularyId)
            .NotEmpty().WithMessage("Vocabulary Id is required.")
            .GreaterThan(0).WithMessage("Vocabulary Id must be greater than 0.");

        RuleFor(d => d.DefinitionId)
            .NotEmpty().WithMessage("Definition Id is required.")
            .GreaterThan(0).WithMessage("Definition Id must be greater than 0.");

        RuleFor(d => d.Meaning)
            .NotEmpty().WithMessage("Meaning is required.")
            .MaximumLength(500).WithMessage("Meaning must not exceed 500 characters.");

        RuleFor(d => d.Translation)
            .MaximumLength(500).WithMessage("Translation must not exceed 500 characters.");

        RuleFor(d => d.PartOfSpeech)
            .MaximumLength(50).WithMessage("Part of Speech must not exceed 50 characters.");
    }
}