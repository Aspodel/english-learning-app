namespace ELA;

public class CreateVocabularyCommandValidator : AbstractValidator<CreateVocabularyCommand>
{
    public CreateVocabularyCommandValidator()
    {
        RuleFor(x => x.Text)
            .NotEmpty().WithMessage("Text is required.")
            .MaximumLength(200).WithMessage("Text must not exceed 200 characters.");

        RuleFor(x => x.IPA)
            .MaximumLength(200).WithMessage("IPA must not exceed 200 characters.");
    }
}
