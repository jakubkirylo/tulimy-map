# TulimyMap

Current Project for My Wife’s Local Business

The idea is to create a map of local points of interest—including shops and restaurants—run by or for the local community in one of Warsaw’s districts (Wesoła).

To Do:
1. SEO optimization
2. Admin panel for creating, updating, and deleting PINs

The app is hosted on Azure: https://gray-water-0b72e7d03.6.azurestaticapps.net/map
Continuous integration is handled by GitHub Actions.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.6.

## For local development you might need:

Static Web Apps (SWA) CLI: https://azure.github.io/static-web-apps-cli/docs/intro

Azurite VS Code addon or other Azure Table Storage Emulator:
https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azurite?tabs=visual-studio%2Cblob-storage

To start a local development server, run:

```bash
swa start http://localhost:4200 --run "npm start" --api-location ./api
```

```bash
cd api
func start
```
You might need to run Azure Functions separately as CLI struggles with C# Azure Functions (SWA CLI works better with Node.js)

Then access page by proxy CLI port:
http://localhost:4280/map

