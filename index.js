const core = require('@actions/core');
const github = require('@actions/github');

async function setOutputs(files) {
    const pathsChanged = []
    const filesChanged = []
    files.forEach(file => {
        pathsChanged.push(file.filename.split("/").slice(0, -1).join("/"))
        filesChanged.push(file.filename)
    })
    core.setOutput("paths_changed", JSON.stringify(pathsChanged))
    core.setOutput("file_changed", JSON.stringify(filesChanged))
}

const main = async () => {
    try {
        const path = core.getInput('path', {required: false}) || "./"
        const token = core.getInput('token', {required: true})
        const pr = github.context.payload.pull_request
        const regExp = RegExp(path)
        const octokit = new github.getOctokit(token);

        const response = await octokit.rest.pulls.listFiles({
            owner: github.context.repo.owner,
            repo: github.context.repo.repo,
            pull_number: pr.number
        })

        const filteredFiles = (response.data || []).filter(file => {
            let isMatch = regExp.test(file.filename)
            console.log(`- ${isMatch} [** match **] ${file.filename}`)
            return isMatch
        })

        if (filteredFiles.length === 0) {
            console.log("No matchs found.")
            console.log(`Raw input: ${directory}`)
            console.log(`Regex: ${regExp.toString()}`)
        }
        await setOutputs(filteredFiles);

    } catch (error) {
        core.setFailed(error.message);
    }
}

main();
