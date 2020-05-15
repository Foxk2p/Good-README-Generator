const axios = require('axios')

axios.get('https://api.github.com/users/Foxk2p')
  .then(({ data }) => {
    console.log(data)
  })
  .catch(err => console.log(err))
