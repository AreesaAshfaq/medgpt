import axios, { AxiosResponse } from 'axios'

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_IMAGE_DETECTION_API_URL,
  timeout: 10000, // request timeout
  headers: {
    'Content-Type': 'application/json',
  },
})

interface ApiResponse<T = any> {
  success: boolean
  data: T
}

const handleResponse = <T>(response: AxiosResponse<T>): ApiResponse<T> => {
  return {
    success: true,
    data: response.data,
  }
}

const handleError = (error: any): ApiResponse<null> => {
  return {
    success: false,
    data: error.response ? error.response.data : null,
  }
}

export const apiGet = async <T = any>(
  url: string,
  config = {},
): Promise<ApiResponse<T>> => {
  try {
    const response = await client.get<T>(url, config)
    return handleResponse(response)
  } catch (error) {
    return handleError(error)
  }
}

export const apiPost = async <T = any>(
  url: string,
  data: any,
  config = {},
): Promise<ApiResponse<T>> => {
  try {
    const response = await client.post<T>(url, data, config)
    return handleResponse(response)
  } catch (error) {
    return handleError(error)
  }
}

export const apiPut = async <T = any>(
  url: string,
  data: any,
  config = {},
): Promise<ApiResponse<T>> => {
  try {
    const response = await client.put<T>(url, data, config)
    return handleResponse(response)
  } catch (error) {
    return handleError(error)
  }
}

// Example usage of the image prediction function with the wrapper
export const getImagePrediction = async (
  image: File,
): Promise<ApiResponse<{ prediction: string; confidence: number }>> => {
  const formData = new FormData()
  formData.append('image', image)
  return apiPost('/predict', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
