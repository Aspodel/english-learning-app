namespace ELA;

public class UpdateVocabularyCommandValidator : AbstractValidator<UpdateVocabularyCommand>
{
    public UpdateVocabularyCommandValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty().WithMessage("Id is required.")
            .GreaterThan(0).WithMessage("Id must be greater than 0.");

        RuleFor(x => x.Text)
            .NotEmpty().WithMessage("Text is required.")
            .MaximumLength(200).WithMessage("Text must not exceed 200 characters.");

        RuleFor(x => x.IPA)
            .MaximumLength(200).WithMessage("IPA must not exceed 200 characters.");
    }
}