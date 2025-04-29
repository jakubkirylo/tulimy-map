using Azure;
using Azure.Data.Tables;

namespace api;

public class UserEntity : ITableEntity
{
  internal static readonly string DefaultPartitionKey = "user"; // nothing to partition on
  public string PartitionKey { get; set; }
  public string RowKey { get; set; }
  public DateTimeOffset? Timestamp { get; set; }
  public ETag ETag { get; set; }
  public string Email { get; set; }
  public string PasswordHash { get; set; }

  // must be present for retrieval operation

  public UserEntity()
  {
    PartitionKey = DefaultPartitionKey;
  }
}
