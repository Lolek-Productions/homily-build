"use server"

import OpenAI from 'openai'

export async function generateAIResponse(prompt, userId) {
  try {
    // Validate inputs
    if (!userId) {
      return { error: "User authentication required" }
    }

    if (!prompt) {
      return { error: "Prompt is required" }
    }

    if (!process.env.OPENAI_API_KEY) {
      return { error: "OpenAI API key not configured" }
    }

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant for Catholic homily preparation. Provide thoughtful, theologically sound content that helps priests and deacons prepare meaningful homilies."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.7,
    })

    const content = completion.choices[0]?.message?.content || ''

    if (!content) {
      return { error: "No content generated from AI" }
    }

    return {
      success: true,
      content,
      usage: completion.usage
    }

  } catch (error) {
    console.error('Error generating AI content:', error)
    
    // Provide more specific error messages
    if (error.code === 'insufficient_quota') {
      return { error: 'OpenAI quota exceeded. Please check your billing.' }
    }
    
    if (error.code === 'invalid_api_key') {
      return { error: 'Invalid OpenAI API key configured.' }
    }
    
    if (error.code === 'rate_limit_exceeded') {
      return { error: 'Rate limit exceeded. Please try again in a moment.' }
    }
    
    return { error: 'Failed to generate AI content. Please try again.' }
  }
}
