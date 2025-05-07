using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace api;

public class GetGoogleMap(ILogger<AuthorizeUser> logger, IConfiguration configuration)
{
  [Function(nameof(GetGoogleMap))]
  public IActionResult Run(
    [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)]
    HttpRequest req)
  {
    // TODO JWK: or get from configuration?
    var key = Environment.GetEnvironmentVariable("GOOGLE_MAP_API");

    if (string.IsNullOrEmpty(key))
    {
      logger.LogError("GOOGLE_MAP_API is not configured in environment variables.");
      return new StatusCodeResult(StatusCodes.Status500InternalServerError);
    }

    return new ContentResult
    {
      Content = key,
      ContentType = "text/plain",
      StatusCode = StatusCodes.Status200OK
    };
  }
}
