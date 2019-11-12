import axios from 'axios'

const apiUrl = 'http://localhost:3000/v1/'

const getTrails = async () => {
  try {
    let response = await axios.get(apiUrl + 'trails')
    return response.data.trails
  } catch(error) {
    return {
      error: error.response.data.error
    }
  }
}

const getSpecificTrail = async (chosenTrail) => {
  try {
    let response = await axios.get(apiUrl + `trails/${chosenTrail}`)
    return response
  } catch(error) {
    return error.response.data
  }
}

const submitTrail = async (title, description, extra, location, duration, intensity, image) => {
  try {
    let response = await axios.post(apiUrl + 'trails',
    {
      title: title,
      description: description,
      extra: extra,
      location: location,
      duration: duration,
      intensity: intensity,
      image: image
    })
    return response.data.message
  } catch(error) {
    return error.response.data
  }
}

export { getTrails, submitTrail, getSpecificTrail }
