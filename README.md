# detect-changes-action

## Description

Action to get paths and files changed in a Pull Request event and use these for [GitHub Actions matrix](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs)
## Inputs

| parameter | description | required | default |
| - | - | - | - |
| path | Path | `false` | ./ |
| token | The token to use to access the GitHub API | `false` | ${{ github.token }} |


## Outputs

| parameter | description |
| - | - |
| paths_changed | List of changed paths, example: ``` ["dist", "dist/data"] ```|
| file_changed | List of changed files, example: ``` ["dist/main.tf", "dist/index.js"] ```|


## Runs

This action is a `node16` action.

