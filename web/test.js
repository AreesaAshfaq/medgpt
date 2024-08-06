const axios = require('axios')

// Define the URL of your Next.js API endpoint
const API_URL = 'http://localhost:3000/api/detect' // Replace with your actual endpoint

// Define the messages to send
const messages = [{ role: 'user', content: 'Hello!' }]

// Define the user message
const userMessage = 'What are the symptoms of a stroke?'

async function testApi() {
  try {
    const response = await axios.post(API_URL, {
      messages: messages,
      userMessage: userMessage,
    })

    console.log('Response from API:', response.data)
  } catch (error) {
    console.error(
      'Error testing API:',
      error.response ? error.response.data : error.message,
    )
  }
}

testApi()
