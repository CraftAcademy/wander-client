import axios from 'axios'

const apiUrl = 'http://localhost:3000/v1/'

const getTrails = async () => {
  try {
    let response = await axios.get(apiUrl + 'trails')
    return response.data
  } catch(error) {
    return error.response.data
  }
}

const getSpecificTrail = async (chosenTrail) => {
  try {
    let response = await axios.get(apiUrl + `trails/${chosenTrail}`)
    return response.data
  } catch(error) {
    return error.response.data
  }
}

const submitTrail = async (title, description, extra, location, duration, intensity, image, coordinates) => {
  try {
    let response = await axios.post(apiUrl + 'trails',
    {
      title: title,
      description: description,
      extra: extra,
      location: location,
      duration: duration,
      intensity: intensity,
      image: image,
      coordinates: coordinates
    })
    return response.data.message
  } catch(error) {
    return error.response.data
  }
}

const searchTrail = async (query) => {
  try {
    let response = await axios.get(apiUrl + `/search/?search=${query}`)
    return response.data.search
  } catch(error) {
    return error.response
  }
}

export { getTrails, submitTrail, getSpecificTrail, searchTrail }
