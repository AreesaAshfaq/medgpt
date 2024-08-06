import axios from 'axios'
import { NextResponse } from 'next/server'

const IMAGE_DETECTION_BASE_URL = process.env.IMAGE_DETECTION_BASE_URL
const IMAGE_DETECTION_API_KEY = process.env.IMAGE_DETECTION_API_KEY

export async function POST(req: Request, res: Response) {
  const dat = await req.formData()
  const image = dat.get('image')

  if (!image) {
    return NextResponse.json({
      success: false,
      data: 'Missing required parameters',
    })
  }

  try {
    // TODO: UPDATE THE URL AND INPUT/OUTPUT FOR API
    const response = await axios.post(
      `${IMAGE_DETECTION_BASE_URL}/v1/`,
      { image },
      {
        headers: {
          Authorization: `Bearer ${IMAGE_DETECTION_API_KEY}`,
        },
      },
    )

    return NextResponse.json({
      success: true,
      data: response.data.choices,
    })
  } catch (error) {
    console.error('Error calling AI71 API:', error)
    return NextResponse.json({ success: false, data: 'Error calling AI71 API' })
  }
}
