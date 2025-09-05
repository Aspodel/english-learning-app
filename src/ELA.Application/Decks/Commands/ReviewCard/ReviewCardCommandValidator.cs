namespace ELA;

public class ReviewCardCommandValidator : AbstractValidator<ReviewCardCommand>
{
    public ReviewCardCommandValidator()
    {
        RuleFor(r => r.CardId)
            .GreaterThan(0).WithMessage("CardId must be greater than 0.");

        RuleFor(r => r.QualityRating)
            .InclusiveBetween(0, 5).WithMessage("QualityRating must be between 0 and 5.");

        RuleFor(r => r.ReviewDate)
            .NotEmpty().WithMessage("ReviewDate must not be empty.");
    }
}