namespace ELA;

public class ReviewCardCommandValidator : AbstractValidator<ReviewCardCommand>
{
    public ReviewCardCommandValidator()
    {
        RuleFor(r => r.CardId)
            .NotEmpty().WithMessage("Card Id is required.")
            .GreaterThan(0).WithMessage("Card Id must be greater than zero.");

        RuleFor(r => r.QualityRating)
            .InclusiveBetween(0, 5).WithMessage("QualityRating must be between 0 and 5.");

        RuleFor(r => r.ReviewDate)
            .NotEmpty().WithMessage("ReviewDate must not be empty.");
    }
}