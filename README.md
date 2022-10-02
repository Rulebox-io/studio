# Rulebox Studio

[![Netlify Status](https://api.netlify.com/api/v1/badges/3b8ba287-e72e-4836-869b-782987ef7495/deploy-status)](https://app.netlify.com/sites/stupefied-knuth-7b6748/deploys)

The **Rulebox Studio** project combines the web front-end and its supporting functions.
It is hosted in **Netlify** and is available at [https://app.netlify.com/sites/stupefied-knuth-7b6748/overview](https://app.netlify.com/sites/stupefied-knuth-7b6748/overview).

## Dependenceies
**Rulebox Studio** is buit with:
* Node 16 (16.13.1)
* Yarn 3 (3.2.1)
* Netlify functions
* Nuxt 3 (3.0.RC4)
* Vue 3
* Pinia
* MagicAuth
* Fauna DB

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

## Deploying to Netflify
To deploy to Netlify, all you need to do is push to `master`. Netlify will run `yarn install` and `yarn build` and will also build the functions and deploy them.

## Configuration

### Front-end Configuration
The front-end uses Nuxt, and so all config is via `Nuxt.config.ts`. For example, see below:

```json
runtimeConfig: {
    public: {
        magicPublishableKey: "pk_live_510BE356BE04CD4C",
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
NUXT_PUBLIC_MAGIC_PUBLISHABLE_KEY=pk_live_510BE356BE04CD4C
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
    const store = new Store(process.env.FAUNADB_SECRET);
    const rbx = new Rulebox(process.env.RULEBOX_API_URL, process.env.RULEBOX_SUBSCRIPTION_KEY)
```

**Note** If no variables are specified in the `Netlify.toml` file, the Netlify runtime will download the variables from Netlify, and so you can use the Netlify UI to set the variables.

#### Configuration in Production
The functions config is also in the Netlify environment variables config section, same place as the UI config.

## MagicAuth and authentication

## Fauna Database

