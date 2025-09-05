using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace ELA;

public static class InitialiserExtensions
{
    public static async Task InitialiseDatabaseAsync(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();

        var initialiser = scope.ServiceProvider.GetRequiredService<ApplicationDbContextInitialiser>();

        await initialiser.InitialiseAsync();
        await initialiser.SeedAsync();
    }
}

public class ApplicationDbContextInitialiser
{
    private readonly ILogger<ApplicationDbContextInitialiser> _logger;
    private readonly ApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public ApplicationDbContextInitialiser(ILogger<ApplicationDbContextInitialiser> logger, ApplicationDbContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        _logger = logger;
        _context = context;
        _userManager = userManager;
        _roleManager = roleManager;
    }

    public async Task InitialiseAsync()
    {
        try
        {
            // Persist database
            // await _context.Database.MigrateAsync();

            // Local test: Ensure the database is recreated each time in debug mode
            await _context.Database.EnsureDeletedAsync();
            await _context.Database.EnsureCreatedAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while initialising the database.");
            throw;
        }
    }

    public async Task SeedAsync()
    {
        try
        {
            await TrySeedAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while seeding the database.");
            throw;
        }
    }

    public async Task TrySeedAsync()
    {
        // Default roles
        var administratorRole = new IdentityRole(Roles.Administrator);

        if (_roleManager.Roles.All(r => r.Name != administratorRole.Name))
        {
            await _roleManager.CreateAsync(administratorRole);
        }

        // Default users
        var administrator = new ApplicationUser { UserName = "admin", Email = "administrator@localhost" };

        if (_userManager.Users.All(u => u.UserName != administrator.UserName))
        {
            await _userManager.CreateAsync(administrator, "Administrator1!");
            if (!string.IsNullOrWhiteSpace(administratorRole.Name))
            {
                await _userManager.AddToRolesAsync(administrator, new[] { administratorRole.Name });
            }
        }

        var user = new ApplicationUser { UserName = "user", Email = "user@localhost" };

        if (_userManager.Users.All(u => u.UserName != user.UserName))
        {
            await _userManager.CreateAsync(user, "User1!");
        }

        // Default data
        if (!_context.Vocabularies.Any())
        {
            var vocab1 = new Vocabulary("apple", "ˈæp.əl", user.Id);
            vocab1.AddDefinition("a round fruit", "quả táo", PartOfSpeech.Noun)
                  .AddExample("I ate an apple.", "Tôi đã ăn một quả táo.");

            var vocab2 = new Vocabulary("run", "rʌn", user.Id);
            vocab2.AddDefinition("to move quickly on foot", "chạy", PartOfSpeech.Verb)
                  .AddExample("She runs every morning.", "Cô ấy chạy mỗi sáng.");

            var vocab3 = new Vocabulary("light", "laɪt", user.Id);
            vocab3.AddDefinition("the natural agent that makes things visible", "ánh sáng", PartOfSpeech.Noun)
                  .AddExample("Light travels faster than sound.", "Ánh sáng di chuyển nhanh hơn âm thanh.");
            vocab3.AddDefinition("not heavy", "nhẹ", PartOfSpeech.Adjective)
                  .AddExample("She wears light clothing in summer.", "Cô ấy mặc quần áo nhẹ vào mùa hè.");
            vocab3.AddDefinition("to set fire to something", "đốt, thắp", PartOfSpeech.Verb)
                  .AddExample("They lit a fire in the fireplace.", "Họ nhóm lửa trong lò sưởi.");

            var vocab4 = new Vocabulary("bank", "bæŋk", user.Id);
            vocab4.AddDefinition("a financial institution", "ngân hàng", PartOfSpeech.Noun)
                  .AddExample("I deposited money in the bank.", "Tôi gửi tiền vào ngân hàng.");
            vocab4.AddDefinition("the side of a river", "bờ sông", PartOfSpeech.Noun)
                  .AddExample("They sat on the river bank.", "Họ ngồi trên bờ sông.");

            var vocab5 = new Vocabulary("play", "pleɪ", user.Id);
            vocab5.AddDefinition("to engage in a game or activity", "chơi", PartOfSpeech.Verb)
                  .AddExample("The children are playing in the park.", "Bọn trẻ đang chơi trong công viên.");
            vocab5.AddDefinition("a theatrical performance", "vở kịch", PartOfSpeech.Noun)
                  .AddExample("We watched a Shakespeare play.", "Chúng tôi xem một vở kịch của Shakespeare.");

            _context.Vocabularies.AddRange(vocab1, vocab2, vocab3, vocab4, vocab5);
        }

        if (!_context.Decks.Any())
        {
            var deck = new Deck("English Basics", user.Id);
            var card1 = deck.AddCard("Hello", "Xin chào");
            var card2 = deck.AddCard("Goodbye", "Tạm biệt");

            card1.AddReviewResult(5, DateTimeOffset.UtcNow, 1, 2.6, 1, DateTimeOffset.UtcNow.AddDays(1));
            card2.AddReviewResult(4, DateTimeOffset.UtcNow, 1, 2.5, 1, DateTimeOffset.UtcNow.AddDays(1));

            _context.Decks.Add(deck);
        }

        await _context.SaveChangesAsync();
    }
}
