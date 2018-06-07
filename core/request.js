import axios from 'axios'
import qs from 'qs'

// request data from token in localStorage
export const withToken = async (route, data) => {
  const authOptions = {
    method: 'POST',
    url: route,
    data: qs.stringify(data),
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    json: true,
  }
  // do http request
  try {
    const response = await axios(authOptions).then(res => res.data)
    // check error, if error = true and message = invalid access token
    // remove token from localStorage
    if (response.error && response.message == 'invalid access token') {
      localStorage.removeItem('token')
    }
    // return response data
    return response
  } catch (e) {
    return e
  }
}
