namespace ASimpleStarGazer.Model.DBContext;

public class ASimpleStarGazerDBContext : DbContext
{
    public ASimpleStarGazerDBContext(DbContextOptions<ASimpleStarGazerDBContext> options) : base(options)
    {

    }
    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ConfigureUserManagement();
    }

}
