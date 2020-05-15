const axios = require('axios')

axios.get('https://api.github.com/users/Foxk2p')
  .then(({ data }) => {
    console.log(data)
    console.log(data.login)
    console.log(data.avatar_url)
    console.log(data.html_url)
  })
  .catch(err => console.log(err))
