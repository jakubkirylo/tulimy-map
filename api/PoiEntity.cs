using Azure;
using Azure.Data.Tables;

namespace api;

public class PoiEntity : ITableEntity
{
    public string PartitionKey { get; set; }
    public string RowKey { get; set; }
    public DateTimeOffset? Timestamp { get; set; }
    public ETag ETag { get; set; }

    public string Name { get; set; } = string.Empty;
    public string Coordinates { get; set; } = string.Empty; // Store as "lat,lng"
    public string? Description { get; set; }
    public string? Banners { get; set; } // Comma-separated
    public string? Www { get; set; }
    public string? Phone { get; set; }
    public string? Address { get; set; }
    public string Type { get; set; } = string.Empty;

    public PoiEntity()
    {
        PartitionKey = "poi";
        RowKey = string.Empty;
    }
}
