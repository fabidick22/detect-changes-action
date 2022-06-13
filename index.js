const core = require('@actions/core');
const github = require('@actions/github');

const main = async () => {
  try {
    const owner = core.getInput('paths', { required: true });
    const token = core.getInput('token', { required: true });
    const octokit = new github.getOctokit(token);

    const { data: changedFiles } = await octokit.rest.pulls.listFiles({
      owner,
      repo,
      pull_number: pr_number,
    });

    let diffData = {
      additions: 0,
      deletions: 0,
      changes: 0
    };

    diffData = changedFiles.reduce((acc, file) => {
      acc.additions += file.additions;
      acc.deletions += file.deletions;
      acc.changes += file.changes;
      return acc;
    }, diffData);

    console.log(changedFiles);

  } catch (error) {
    core.setFailed(error.message);
  }
}

main();
