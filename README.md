# Rulebox Studio

[![Netlify Status](https://api.netlify.com/api/v1/badges/3b8ba287-e72e-4836-869b-782987ef7495/deploy-status)](https://app.netlify.com/sites/stupefied-knuth-7b6748/deploys)

The **Rulebox Studio** project combines the web front-end and its supporting functions.
It is hosted in **Netlify** and is available at [https://app.netlify.com/sites/stupefied-knuth-7b6748/overview](https://app.netlify.com/sites/stupefied-knuth-7b6748/overview).

## Dependencies

**Rulebox Studio** is built with:

- Node 18 (18.15.0)
- Yarn 3 (3.2.1)
- Netlify functions
- Nuxt 3 (3.2.3)
- Vue 3
- Pinia
- MagicAuth
- Fauna DB

## Setting up Visual Studio Code

The project uses the following VS Code extensions:

- Volar - Vue autocomplete and useful stuff
- ESLint - Linter support
- Prettier - Same for Prettier
- Tailwind CSS IntelliSense - autocmplete for Tailwind classes

### VS Code Settings

Always open the project using the workspace file, `rulebox-studio.code-workspace`. This will ensure that the correct settings are used.
The settings include auto-prettying on save, that sort of thing.

### Prettier and ESLint

ESLint is the linter for javascript and typescript files. It checks for code errors and style issues. Because we use the ESLint plugin you'll see lint errors in the editor.

Prettier is a code formatter. For this project, on save, Prettier will format the code, so there's not need to agree on code standards etc.

NOTE: The ESLint config is told to use the same rules as Prettier, otherwise you get into an impossible situation....

## Running Rulebox Studio Locally

### Running the web app locally

From the root folder:

```bash
yarn install
yarn dev
```

The starts the development server on http://localhost:3000

### Running Netflify functions locally

This uses the same folder as the web app, and so you don't need to run `yarn install` twice.

```bash
yarn install
netlify functions:serve
```

This starts the functions runtime at http://localhost:9999

## Building Rulebox Studio locally

You can do a production build locally, and even serve it use an express server.

```bash
yarn install
yarn build
yarn start
```

This starts the production server on http://localhost:3000

## Deploying to Netflify

To deploy to Netlify, all you need to do is push to `master`. Netlify will run `yarn install` and `yarn build` and will also build the functions and deploy them.

## Configuration

### Front-end Configuration

The front-end uses Nuxt, and so all config is via `Nuxt.config.ts`. For example, see below:

```json
runtimeConfig: {
    public: {
        magicPublishableKey: "pk_live_XXXXXXXXXXX",
        studioApiUrl: "http://localhost:9999/.netlify/functions",
    },
},
```

In code, these config keys are retrieved using `useRuntimeConfig`:

```typescript
const config = useRuntimeConfig()
const magic = new Magic(config.public.magicPublishableKey)
```

Nuxt also supports `.env` and so you can use the `.env` file to set the config keys, using environment variables:

```
NUXT_PUBLIC_STUDIO_API_URL="http://localhost:9999/.netlify/functions"
NUXT_PUBLIC_MAGIC_PUBLISHABLE_KEY=pk_live_XXXXXXXXXXXXXXXX
```

Note that Nuxt automatically maps the uppercase snake case of env variables to camcel case of config keys.

#### Configuration in Production

For a production build in Netlify, we use environment variables via the Netlify config. These override the values in .env, and in turn override the defaults set in `nuxt.config.ts` 🤯

### Back end Configuration

For the back-end functions, Netlify uses the `Netlify.toml` file. This file is in the root of the project.

```
[build]
  environment = { ENVVAR="VALUE",  .... }
```

This may contain the env variables Netlify injects into the functions runtime, and they are used like regular env variables in code, as below:

```typescript
// Use the Store module to retrieve the keys, or make changes to a key.
const store = new Store(process.env.FAUNADB_SECRET)
const rbx = new Rulebox(
  process.env.RULEBOX_API_URL,
  process.env.RULEBOX_SUBSCRIPTION_KEY
)
```

**Note** If no variables are specified in the `Netlify.toml` file, the Netlify runtime will download the variables from Netlify, and so you can use the Netlify UI to set the variables.

#### Configuration in Production

The functions config is also in the Netlify environment variables config section, same place as the UI config.

Note that one addtional environment variable controls the version of Node that the build agent uses. This is set in the Netlify UI, and is called `NODE_VERSION`.

This is because locally we use Node 18, but Netlify only supports Node 16. So we need to set the version to 16 in Netlify.

## MagicAuth and authentication

## Fauna Database
