# ability-damage-analysis

## web-app

[rs-analysis.xyz](https://rs-analysis.xyz)

### Getting started

Requirements:

- `yarn` (must be available on `PATH`)

Install dependencies:

```sh
yarn install
```

Run the local server:

```sh
yarn start
```

### Deploys

Deploys are automatic on pushes to `main`. The site is deployed via the `gh-pages`
branch which contains the latest contents of the `dist` folder after a build (this is handled
automatically by GitHub Actions - refer to `.github/workflows/main.yml`).

#### Manual deploy

To do a manual deploy from your local branch:

```sh
yarn build-and-deploy
```
