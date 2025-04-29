using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace api;

internal static class HttpRequestDataExtensions
{
  public static async Task<T?> ReadFromJsonSafeAsync<T>(
    this HttpRequest req, ILogger? logger = null
  )
  {
    try
    {
      return await req.ReadFromJsonAsync<T>();
    }
    catch (Exception ex)
    {
      logger?.LogError(
        ex,
        "Error deserializing value of type {RequestType} from request body",
        typeof(T).Name
      );
      return default;
    }
  }
}
