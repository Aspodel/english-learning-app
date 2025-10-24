using ELA.Vocabularies.Dtos;

namespace ELA;

public class CreateVocabularyWithDetailsCommandValidator
    : AbstractValidator<CreateVocabularyWithDetailsCommand>
{
    public CreateVocabularyWithDetailsCommandValidator()
    {
        RuleFor(v => v.Text)
            .NotEmpty().WithMessage("Vocabulary is required.")
            .MaximumLength(200).WithMessage("Vocabulary must not exceed 200 characters.");

        RuleFor(v => v.IPA)
            .MaximumLength(200).WithMessage("IPA must not exceed 200 characters.");

        RuleForEach(v => v.Definitions)
            .SetValidator(new DefinitionInputValidator());
    }
}

public class DefinitionInputValidator : AbstractValidator<CreateDefinitionDto>
{
    public DefinitionInputValidator()
    {
        RuleFor(d => d.Meaning)
            .NotEmpty().WithMessage("Meaning is required.")
            .MaximumLength(500).WithMessage("Meaning must not exceed 500 characters.");

        RuleFor(d => d.Translation)
            .MaximumLength(500).WithMessage("Definition translation must not exceed 500 characters.");

        RuleFor(d => d.PartOfSpeech)
            .MaximumLength(50).WithMessage("Part of speech must not exceed 50 characters.");

        RuleFor(d => d.PartOfSpeech)
            .Must(pos => pos.IsValidPartOfSpeech())
            .WithMessage("Invalid part of speech.")
            .When(d => !string.IsNullOrWhiteSpace(d.PartOfSpeech));

        RuleForEach(d => d.Examples)
            .SetValidator(new ExampleInputValidator());
    }
}

public class ExampleInputValidator : AbstractValidator<CreateExampleDto>
{
    public ExampleInputValidator()
    {
        RuleFor(e => e.Text)
            .NotEmpty().WithMessage("Example is required.")
            .MaximumLength(500).WithMessage("Example must not exceed 500 characters.");

        RuleFor(e => e.Translation)
            .MaximumLength(500).WithMessage("Example translation must not exceed 500 characters.");
    }
}
