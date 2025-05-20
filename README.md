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


## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
