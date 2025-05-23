using System.Net;
using Azure;
using Azure.Data.Tables;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Text.Json;

namespace api;

public class PoiFunctions
{
    private readonly TableServiceClient _tableServiceClient;
    private readonly ILogger<PoiFunctions> _logger;
    private const string TableName = "pois";

    public PoiFunctions(ILogger<PoiFunctions> logger, IConfiguration configuration)
    {
        _logger = logger;
        _tableServiceClient = new TableServiceClient(configuration["TulimyAzureWebJobsStorageConnectionString"]);
    }

    [Function("GetPois")]
    public async Task<IActionResult> GetPois([
        HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "pois")
    ] HttpRequest req)
    {
        var table = _tableServiceClient.GetTableClient(TableName);
        await table.CreateIfNotExistsAsync();
        var query = table.QueryAsync<PoiEntity>(x => x.PartitionKey == "poi");
        var result = new List<PoiEntity>();
        await foreach (var entity in query)
        {
            result.Add(entity);
        }
        return new OkObjectResult(result);
    }

    [Function("CreatePoi")]
    public async Task<IActionResult> CreatePoi([
        HttpTrigger(AuthorizationLevel.Function, "post", Route = "pois")
    ] HttpRequest req)
    {
        var table = _tableServiceClient.GetTableClient(TableName);
        await table.CreateIfNotExistsAsync();
        var body = await req.ReadFromJsonSafeAsync<PoiEntity>(_logger);
        if (body == null)
            return new BadRequestObjectResult("Invalid POI data");
        if (string.IsNullOrEmpty(body.RowKey))
            body.RowKey = Guid.NewGuid().ToString();
        body.PartitionKey = "poi";
        await table.AddEntityAsync(body);
        return new OkObjectResult(body);
    }

    [Function("UpdatePoi")]
    public async Task<IActionResult> UpdatePoi([
        HttpTrigger(AuthorizationLevel.Function, "put", Route = "pois/{id}")
    ] HttpRequest req, string id)
    {
        var table = _tableServiceClient.GetTableClient(TableName);
        await table.CreateIfNotExistsAsync();
        var body = await req.ReadFromJsonSafeAsync<PoiEntity>(_logger);
        if (body == null)
            return new BadRequestObjectResult("Invalid POI data");
        body.PartitionKey = "poi";
        body.RowKey = id;
        await table.UpsertEntityAsync(body, TableUpdateMode.Replace);
        return new OkObjectResult(body);
    }

    [Function("DeletePoi")]
    public async Task<IActionResult> DeletePoi([
        HttpTrigger(AuthorizationLevel.Function, "delete", Route = "pois/{id}")
    ] HttpRequest req, string id)
    {
        var table = _tableServiceClient.GetTableClient(TableName);
        await table.CreateIfNotExistsAsync();
        await table.DeleteEntityAsync("poi", id);
        return new OkResult();
    }
}
