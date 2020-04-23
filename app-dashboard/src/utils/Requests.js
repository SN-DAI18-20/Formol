import axios from 'axios'
import https from 'https'

const url = process.env.NODE_ENV == 'development'
  ? "https://api.dev.formol.site/v1/polls"
  : "https://api.dev.formol.site/v1/polls"

export const getPolls = async () => {

  const options = {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    })
  }
  try {
    const data = await axios.get(url, options)
    console.log({data})
  } catch (error) {
    console.log({error})
  }
}