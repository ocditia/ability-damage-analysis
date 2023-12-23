# ability-damage-analysis

## web-app

### Getting started

Requirements:

* `yarn` (must be available on `PATH`)

Install dependencies:

```sh
yarn install
```

Run the local server:

```sh
yarn start
```

### Linting

To run the linter and fix all issues:

```sh
yarn lint:fix
```


### Testing

To run all tests:

```sh
yarn test:all
```

To run style-specific tests:

```sh
yarn test:necro
yarn test:magic
```

**NOTE: There are a lot of issues. Some are actual bugs, some are style/readability/consistency issues.**

If you have the `ESLint` VSCode extension, you can configure it to format on save.

## TODO

* Bug fixes/enhancements
  * Fix dropdowns
  * Input validations
* Styling improvements
  * Ability analysis dropdown cut-off in window
  * Dropdown Hover styling, border/box-shadow
  * Align all boxes
  * Align inputs
* Design
  * Smaller banner/higher-res
  * Wrap "effects" box to reduce page length
  * Consistent capitalization (abilities, effects, etc.)
  * Use dropdowns for perk ranks instead of inputs
