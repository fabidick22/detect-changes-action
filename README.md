# detect-changes-action

Action to get paths and files changed in a Pull Request event and use these for [GitHub Actions matrix](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs).

NOTE: this repository started out as a fork of `fabidick22/detect-changes-action` but ended up copying a lot of code from `jitterbit/get-changed-files` over time.

## Available Features
- Get list of directories changed in a PR
- Get list of files changed in a PR

## Usage
<details><summary><strong> Get a list of paths to use in a matrix of jobs (v1)</strong></summary>

```yaml
name: 'PR Detect changes'
on:
  pull_request:
    types: [synchronize, opened, reopened, labeled]
    branches:
      - main
jobs:
  changes:
    runs-on: ubuntu-latest
    outputs:
      packages: ${{ steps.filter.outputs.paths_list }}
    steps:
      - uses: actions/checkout@v3
      - name: Annotate PR
        id: filter
        uses: jeffbeal/detect-changes-action@v1
        with:
          path: "modules/"

  build:
    needs: changes
    strategy:
      matrix:
        package: ${{ fromJSON(needs.changes.outputs.packages) }}
    runs-on: ubuntu-latest
    steps:
      - run: echo '${{ matrix.package }}'
```
</details>

<!-- action-docs-inputs -->
## Inputs

| parameter | description | required | default |
| - | - | - | - |
| path | Path | `false` | ./ |
| token | The token to use to access the GitHub API | `false` | ${{ github.token }} |



<!-- action-docs-inputs -->

<!-- action-docs-outputs -->
## Outputs

| parameter | description |
| - | - |
| `paths_list` | List of changed paths, example: `["dist", "dist/data"]`             |
| `file_list`  | List of changed files, example: `["dist/main.tf", "dist/index.js"]` |
| `paths_str`  | List of changed paths separated by `,` example: `"dist,dist/data"`  |
| `file_str`   | List of changed files separated by `,` example: `"dist/main.tf,dist/index.js"` |



<!-- action-docs-outputs -->

<!-- action-docs-runs -->
## Runs

This action is a `node16` action.


<!-- action-docs-runs -->
