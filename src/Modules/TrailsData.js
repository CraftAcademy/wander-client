import axios from 'axios'

const apiUrl = 'http://localhost:3000/v1/'

const getTrails = async () => {
  try {
    let response = await axios.get(apiUrl + 'trails')
    return response.data
  } catch(error) {
    return {
      error: error.response
    }
  }
}

export default { getTrails }