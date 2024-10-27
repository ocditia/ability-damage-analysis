# ability-damage-analysis

## web-app

[rs-analysis.xyz](https://rs-analysis.xyz)

### Getting started

Requirements:

- `npm` (must be available on `PATH`)

Install dependencies:

```sh
npm install
```

Run the local server:

```sh
npm start
```

### Deploys

Deploys are automatic on pushes to `main`. The site is deployed via the `gh-pages`
branch which contains the latest contents of the `build` folder after a build (this is handled
automatically by GitHub Actions - refer to `.github/workflows/main.yml`).
