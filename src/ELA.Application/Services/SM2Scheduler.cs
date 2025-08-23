namespace ELA;

public class SM2Scheduler : ISpacedRepetitionScheduler
{
    public ReviewComputationResult Compute(Card card, int quality, DateTimeOffset reviewDate)
    {
        if (quality is < 0 or > 5)
            throw new ArgumentOutOfRangeException(nameof(quality), "Quality must be 0..5");

        var previousInterval = card.Interval;
        var previousEaseFactor = card.EaseFactor;
        var previousRepetition = card.Repetition;
        var suspended = card.Suspended;

        if (suspended) throw new InvalidOperationException("Card is suspended.");

        int newInterval;
        double newEf = Math.Max(1.3, previousEaseFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
        int newRep = previousRepetition;

        if (quality >= 3)
        {
            newRep++;
            if (previousRepetition == 0) newInterval = 1;
            else if (previousRepetition == 1) newInterval = 6;
            else newInterval = (int)Math.Round(previousInterval * newEf);
        }
        else
        {
            newRep = 0;
            newInterval = 1;
        }

        var next = reviewDate.AddDays(newInterval);

        return new ReviewComputationResult(
            NewInterval: newInterval,
            NewEaseFactor: newEf,
            NewRepetition: newRep,
            NextReview: next
        );
    }
}
