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
debugger
    let response = await axios.get(apiUrl + `trails/${chosenTrail}`)
    debugger
    return response.data
  } catch(error) {

    return error.response.data

  }
}

const submitTrail = async (title, description, extra, city, country, continent, duration, intensity, image, coordinates) => {
  try {
    let response = await axios.post(apiUrl + 'trails',
    {
      title: title,
      description: description,
      extra: extra,
      city: city,
      country: country,
      continent: continent,
      duration: duration,
      intensity: intensity,
      image: image,
      coordinates: coordinates
    })
    return response.data
  } catch(error) {
    return error.response.data
  }
}

const searchTrail = async (query) => {
  try {
    let response = await axios.get(apiUrl + `/trails/?search=${query}`)
    return response.data
  } catch(error) {
    return error.response.data
  }
}

const searchContinent = async (query) => {
  try {
    let response = await axios.get(apiUrl + `/trails?continent=${query}`)
    return response.data
  } catch(error) {
    return error.response.data
  }
}

export { getTrails, submitTrail, getSpecificTrail, searchContinent, searchTrail }
