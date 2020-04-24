import axios from 'axios'

const url = process.env.NODE_ENV == 'development'
  ? "https://api.dev.formol.site/v1/polls"
  : "https://api.dev.formol.site/v1/polls"

const options = {
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
}

export const getPolls = async () => {

  try {
    const response = await axios.get(url, options)
    return response.data
  } catch (error) {
    console.log({error})
  }
}

export const getSpecificPoll = async (id) => {

  try {
    const pollUrl = `${url}/${id}`
    const response = await axios.get(pollUrl, options)
    return response.data
  } catch (error) {

  }
}
export const getVersionsPoll = async (id) => {
    try {
        const pollUrl = `${url}/${id}/versions`
        const response = await axios.get(pollUrl, options)
        return response.data
    } catch (error) {

    }
}

export const createPoll = async (data) => {
  try {
    const response = await axios.post(url, data)
    return response.data
  } catch (error) {
    console.log({error})
  }
}

export const deleteVersion = async (pollId, id) => {
    try {
        const response = await axios.delete(`${url}/${pollId}/versions/${id}`)
        return response.data
    } catch (error) {

    }
}

export const createNewVersion = async (pollId, state) => {
    try {
        const response = await axios.post(`${url}/${pollId}/versions`, state)
        return response.data
    } catch (error){

    }
}

export const getVersion = async (pollId, id) => {
    try{
        const response = await axios.get(`${url}/${pollId}/versions/${id}`)
        return response.data
    } catch(err){

    }
}