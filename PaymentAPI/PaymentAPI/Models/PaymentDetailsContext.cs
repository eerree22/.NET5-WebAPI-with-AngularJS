using Microsoft.EntityFrameworkCore;

namespace PaymentAPI.Models
{
    public class PaymentDetailsContext : DbContext
    {
        public PaymentDetailsContext(DbContextOptions<PaymentDetailsContext> options) : base(options)
        {

        }

        public DbSet<PaymentDetails> PaymentDetails { get; set; }
    }
}
