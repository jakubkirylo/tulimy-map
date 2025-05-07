using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using Azure;
using Azure.Data.Tables;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using UnauthorizedResult = Microsoft.AspNetCore.Mvc.UnauthorizedResult;

namespace api
{
  public class AuthorizeUser(ILogger<AuthorizeUser> logger, IConfiguration configuration)
  {
    private readonly TableServiceClient _tableClient = new(configuration["TulimyAzureWebJobsStorageConnectionString"]);
    private readonly string JwtSecret = new(configuration["JwtSecret"]);

    [Function("AuthorizeUser")]
    public async Task<IActionResult> Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")] HttpRequest req)
    {
      logger.LogInformation("C# HTTP trigger function processed a request.");

      var loginData = await req.ReadFromJsonSafeAsync<LoginData>();
      if (string.IsNullOrWhiteSpace(loginData?.Email))
      {
        return new BadRequestObjectResult("Request body invalid. Email is empty.");
      }

      try
      {
        // TODO: magic string to config
        var userTable = await GetTableAsync("users");

        UserEntity user = await userTable.GetEntityAsync<UserEntity>(
          UserEntity.DefaultPartitionKey,
          loginData.Email.ToLowerInvariant().Trim()
        );

        if (string.IsNullOrWhiteSpace(user.PasswordHash) ||
            !BCrypt.Net.BCrypt.Verify(loginData.Password, user.PasswordHash))
        {
          return new UnauthorizedResult();
        }

        var token = GenerateJwtToken(loginData.Email);
        return new OkObjectResult(new { token });
      }
      catch (RequestFailedException ex) when (ex.Status == (int)HttpStatusCode.NotFound)
      {
        logger.LogError(ex, "User does not exist {Email}", loginData?.Email);
        return new UnauthorizedResult();
      }
      catch (Exception ex)
      {
        logger.LogError(ex, "Authorization of {Email} failed", loginData.Email);
        return new StatusCodeResult(StatusCodes.Status500InternalServerError);
      }
    }


    private async Task<TableClient> GetTableAsync(string tableName)
    {
      var tC = _tableClient.GetTableClient(tableName);
      await tC.CreateIfNotExistsAsync();
      return tC;
    }

    private string GenerateJwtToken(string username)
    {
      var tokenHandler = new JwtSecurityTokenHandler();
      var key = Encoding.UTF8.GetBytes(JwtSecret);

      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(new[]
        {
          new Claim(ClaimTypes.Name, username)
        }),
        Expires = DateTime.UtcNow.AddHours(1),
        SigningCredentials =
          new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
      };

      var token = tokenHandler.CreateToken(tokenDescriptor);
      return tokenHandler.WriteToken(token);
    }
  }
}
