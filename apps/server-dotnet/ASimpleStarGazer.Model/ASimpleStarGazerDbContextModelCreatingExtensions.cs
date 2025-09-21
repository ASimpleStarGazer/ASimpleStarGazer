public static class ASimpleStarGazerDbContextModelCreatingExtensions
{
    private const string TablePrefix = "";
    public static void ConfigureUserManagement(this ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(u =>
        {
            u.HasKey(x => x.Id);
            u.HasIndex(b => b.Username).IsUnique();
        });
    }

}

