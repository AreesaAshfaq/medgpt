import axios from 'axios'
import { NextResponse } from 'next/server'

const AI71_BASE_URL = process.env.AI71_BASE_URL
const AI71_API_KEY = process.env.AI71_API_KEY

export async function POST(req: Request, res: Response) {
  const dat = await req.json()

  const { chatHistory, newMessage } = dat

  if (!chatHistory || !newMessage) {
    return NextResponse.json({ error: 'Missing required parameters' })
  }

  try {
    const allMessages = [...chatHistory, { role: 'user', content: newMessage }]

    const response = await axios.post(
      `${AI71_BASE_URL}/v1/chat/completions`,
      {
        model: 'tiiuae/falcon-180b-chat',
        messages: allMessages,
      },
      {
        headers: {
          Authorization: `Bearer ${AI71_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    )

    return NextResponse.json({
      success: true,
      data: response.data.choices,
    })
  } catch (error) {
    console.error('Error calling AI71 API:', error)
    return NextResponse.json({ error: 'Error calling AI71 API' })
  }
}
