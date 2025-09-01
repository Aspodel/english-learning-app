namespace ELA;

public class CreateVocabularyCommandValidator : AbstractValidator<CreateVocabularyCommand>
{
    public CreateVocabularyCommandValidator()
    {
        RuleFor(x => x.Text)
            .NotEmpty().WithMessage("Text is required.")
            .MaximumLength(250).WithMessage("Text must not exceed 250 characters.");

        RuleFor(x => x.IPA)
            .MaximumLength(100).WithMessage("IPA must not exceed 100 characters.");

        RuleFor(x => x.UserId)
            .NotEmpty().WithMessage("UserId is required.");
    }
}
