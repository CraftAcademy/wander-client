import axios from 'axios'

const apiUrl = 'http://localhost:3000/v1/'

const submitTrail = async (title, description, extra, location, duration, intensity) => {
  try {
    let response = await axios.post(apiUrl + 'trails',
    {
      title: title,
      description: description,
      extra: extra,
      location: location,
      duration: duration,
      intensity: intensity
    })
    return response
  } catch(error) {
    return error.response.data.error_message
  }
}

export { submitTrail } 