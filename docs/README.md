# Shared UI Libraries Developer Docs

## Editor

If you're using [VSCode](https://code.visualstudio.com/) (recommended), navigate to the Extensions to install the [recommended extensions](/.vscode/extensions.json).

## Setting up your development environment

The following are instructions for building and running Batch Explorer and the Shared Libraries in a development environment.

1. Install dependencies:

    ```shell
    npm run dev-setup
    npm install
    pip3 install -r python/requirements.txt
    ```

2. Build the libraries:

    ```shell
    npm run build
    ```

## Running Batch Shared Libraries Web

```shell
npm run start:web
```

## Running Batch Explorer Desktop

The following guidelines for running Batch Explorer are all executed from the `desktop/` subdirectory. Change into it before running them.

```shell
npm run dev-server # Start the dev server (in one shell)
npm run dev-electron # Start Electron (in another shell)
```

The dev-server and dev-electron support hot reload for a better development experience. Simply saving a file will cause the UI to refresh to your updated changes.

*Note:* Changes to any files in the node client directory ('desktop/src/client') require restarting the application.

Please also take a look at the [coding guidelines](desktop/coding-guidelines.md) for this repo for best practices.

### Detailed Batch Explorer commands

**Magic command** (starts the server and electron in dev mode)

```shell
npm run dev
```

Build project

```shell
npm run build
```

Run app

```shell
npm run electron
```

Run watch (this will build files on save)

```shell
npm run watch
```

Run dev server (this will handle the refresh of files and later should have live reload)

```shell
npm run dev-server
```

Run dev electron (to use the dev server you need to run this)

```shell
npm run dev-electron
```

## Working on both the Shared Libraries and the Portal Extension

The Portal Extension relies on packages provided by the shared libraries. The portal installs the necessary dependencies that are published on a remote registry. If you want to work on the portal in tandem with local, unpublished versions of the shared libraries, you will need to run the following commands[^bux]:

1. Configure paths to relevant repos:

    ```shell
    bux configure
    ```

2. Run the link command:

    ```shell
    bux link
    ```

The Portal Extension will now use the shared libraries directly from this repo.

<!-- Footnotes -->

 [^bux]: `bux` is installed using the `npm run dev-setup` command. If `bux` doesn't appear to be recognized, run this command again.
