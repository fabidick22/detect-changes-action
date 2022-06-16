const core = require('@actions/core');
const github = require('@actions/github');

const main = async () => {
  try {
    const path = core.getInput('path', { required: true });
    const token = core.getInput('token', { required: true });
    const regExp = RegExp(path)
    const octokit = new github.getOctokit(token);

    const response = await octokit.rest.repos.compareCommits({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      base: "HEAD^",
      head: "HEAD"
    })

    const filteredFiles = (response.data.files || []).filter(file => {
        let isMatch = regExp.test(file.filename)
        console.log(`[${isMatch && '[** match **]'} ${file.filename}`)
        console.log(`##Path: ${file.filename} matches`)
        return isMatch
    })

    if(filteredFiles.length === 0){
        console.log("No matchs found.")
        console.log(`Raw input: ${directory}`)
        console.log(`Regex: ${regExp.toString()}`)
        core.setOutput("hasChanges", false)
    }

    console.log(`Found a total of ${filteredFiles.length} matches`)

    core.setOutput("hasChanges", true)

  } catch (error) {
    core.setFailed(error.message);
  }
}

main();
