# SmartSync-Dashboard

This simple Dashboard Admin App serves as the UI for SmartSync.
It was built using Angular 2 and Bootstrap 4, and was
forked from [SB-Admin-BS4-Angular-2](https://github.com/start-angular/SB-Admin-BS4-Angular-2).

## How to start

**Note** that this seed project requires node v4.x.x or higher and npm 2.14.7.

In order to start the seed use:

```bash
git clone https://github.com/KrashLeviathan/SmartSync-Dashboard.git
cd SmartSync-Dashboard
# install the project's dependencies
npm install
# watches your files and uses livereload by default
npm start
# api document for the app
# npm run build.docs

# dev build
npm run build.dev
# prod build
npm run build.prod
# prod build with AoT compilation
npm run build.prod.exp

# dev build of multiple applications (by default the value of --app is "app")
npm start -- --app baz
npm start -- --app foo
npm start -- --app bar
```


### Configuration

Default application server configuration

```js
var PORT             = 5555;
var LIVE_RELOAD_PORT = 4002;
var DOCS_PORT        = 4003;
var APP_BASE         = '/';
```

Configure at runtime

```bash
npm start -- --port 8080 --reload-port 4000 --base /my-app/
```

## Environment configuration

If you have different environments and you need to configure them to use different end points, settings, etc. you can use the files `dev.ts` or `prod.ts` in`./tools/env/`. The name of the file is environment you want to use.

The environment can be specified by using:

```bash
npm start -- --config-env ENV_NAME
```

Currently the `ENV_NAME`s are `dev`, `prod`, `staging`, but you can simply add a different file `"ENV_NAME.ts".` file in order to alter extra such environments.
