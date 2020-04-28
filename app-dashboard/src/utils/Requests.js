import axios from 'axios'

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
    const response = await axios.get(url, options)
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

export const createPoll = async (pollData) => {
    const response = await axios.post(`${url}`, pollData)
    return response.data
}

export const createNewVersion = async (pollId, state) => {
    try {
        const response = await axios.post(`${url}/${pollId}/versions`, state.questions)
        return response.data
    } catch (error){

    }
}
/**
 *
 * @param {string} pollId
 * @param {string} id
 */
export const getVersion = async (pollId, id) => {
    try{
        const response = await axios.get(`${url}/${pollId}/versions/${id}`)
        return response.data
    } catch(err){

    }
}
/**
 *
 * @param {string} pollId
 */
export const deletePoll = async (pollId) => {
    const response = await axios.delete(`${url}/${pollId}`)
    return response.data
}

export const updatePollInformation = async (pollId, information) => {
    const response = await axios.patch(`${url}/${pollId}`, information)
    return response.data
}

export const getSpecificPoll = async (pollId) => {
    const response = await axios.get(`${url}/${pollId}`)
    return response.data
}

export const getVersionsPoll = async (pollId) => {
    const response = await axios.get(`${url}/${pollId}/versions`)
    return response.data
}

export const downloadPoll = async (url) => {

  const options = {
    headers: {
      "Content-Disposition": "attachment",
      'Access-Control-Allow-Origin': '*',
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    })
  }

  try {
    const response = await axios.get(url, options)
    return response.data
  } catch(err) {
    console.log({err})
  }

}