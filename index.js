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
   Github user: ${data.login}'s
GitHub Project Title: ${(id)} project
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
        for (const userName in userInfo) {
          axios.get(`https://api.github.com/users/${userName}`, {
          })
            .then(({ data }) => {
              appendFileSync('README.md', userGithub(data))
              if (name === 'prjLicense') {
                appendFileSync('README.md', `Enjoy the Project!`)
              }
            })
        }
      })
      .catch(err => console.log(err))
  })
  .catch(err => console.log(err))

// GHtoken(personal access token)
// c1f329fa72facc83003cbbb55604c9df566f0908

// {
//   type: 'input',
//     name: 'prompt6',
//       message: 'What type of license would you like to use? e.g. ',
//         choices: ['MIT License', 'GNU GPLv3', 'The Unlicense']
// }