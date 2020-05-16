const { writeFile, appendFile } = require('fs')
const { prompt } = require('inquirer')
const { promisify } = require('util')
const axios = require('axios')

const writeFileSync = promisify(writeFile)
const appendFileSync = promisify(appendFile)

const top = `
GitHub Project - README.md
`

const userGithub = data => {
  return `
    Github Username: ${data.login}
    GitHub Project Title:  <img src= ${data.avatar_url} alt="plant image" width="200" height="200">

  `
}

const userInput = response => {
  return `
    ${response.userName}
    ${response.prjDescription}
    ${response.prjDescription}
    ${response.prjUse}
    ${response.prjSteps}
    ${response.License}

  `
}

writeFileSync('README.md', top)
  .then(() => {
    prompt([
      {
        type: 'input',
        name: 'userName',
        message: 'What is your GitHub username?'
      },
      {
        type: 'input',
        name: 'prjTitle',
        message: 'What is the title of your project?'
      },
      {
        type: 'input',
        name: 'prjDescription',
        message: 'Please provide a brief description of your project.'
      },
      {
        type: 'input',
        name: 'prjUse',
        message: 'Please provide instructions and examples for use of your project.',
      },
      {
        type: 'input',
        name: 'prjSteps',
        message: 'What are the steps required to install your project?',
        default: `Use "npm init -y" then "npm i" commands to ensure proper installation.`
      },
      {
        type: 'input',
        name: 'prjLicense',
        message: 'What type of license would you like to use? e.g. MIT License GNU GPLv3 The Unlicense '
      }
    ])
      .then(userInfo => {
        console.log(userInfo)

        axios.get(`https://api.github.com/users/${userInfo.userName}`, {
        })
          .then(({ data }) => {
            appendFileSync('README.md', userGithub(data))

          })
        appendFileSync('README.md', userInput(userInfo))
      })
      .catch(err => console.log(err))
  })
  .catch(err => console.log(err))