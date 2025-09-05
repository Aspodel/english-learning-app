namespace ELA;

public class Sm2Scheduler : ISpacedRepetitionScheduler
{
    public (int NewInterval, double NewEaseFactor, int NewRepetition, DateTimeOffset NextReviewDate)
        CalculateNextReview(Card card, int qualityRating, DateTimeOffset reviewDate)
    {
        int repetition = card.Repetition;
        int interval = card.Interval;
        double easeFactor = card.EaseFactor;

        // Rule: If quality < 3, reset repetition
        if (qualityRating < 3)
        {
            repetition = 0;
            interval = 1;
        }
        else
        {
            if (repetition == 0)
            {
                interval = 1;
            }
            else if (repetition == 1)
            {
                interval = 6;
            }
            else
            {
                interval = (int)Math.Round(interval * easeFactor);
            }

            repetition++;
        }

        // Update ease factor
        easeFactor = easeFactor + (0.1 - (5 - qualityRating) * (0.08 + (5 - qualityRating) * 0.02));
        if (easeFactor < 1.3)
            easeFactor = 1.3; // minimum allowed

        var nextReviewDate = reviewDate.AddDays(interval);

        return (interval, easeFactor, repetition, nextReviewDate);
    }
}