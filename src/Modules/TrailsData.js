import axios from 'axios'

const apiUrl = 'http://localhost:3000/v1/'

const getTrails = async () => {
  try {
    let response = await axios.get(apiUrl + 'trails')
    return response.data.trails
  } catch(error) {
    return error.response.data
  }
}

const getSpecificTrail = async (chosenTrail) => {
  try {
    debugger
    let response = await axios.get(apiUrl + `trails/${chosenTrail}`)
    return response
  } catch(error) {
    return error.response.data
  }
}

export { getTrails, getSpecificTrail }