"use server"

import Anthropic from '@anthropic-ai/sdk'

/**
 * Generates an AI response using Claude from Anthropic
 * @param {string} prompt - The prompt to send to Claude
 * @param {string} userId - The user ID for authentication
 * @returns {Promise<{success?: boolean, content?: string, usage?: object, error?: string}>}
 */
export async function generateClaudeResponse(prompt: string, userId: string) {
  try {
    // Validate inputs
    if (!userId) {
      return { error: "User authentication required" }
    }

    if (!prompt) {
      return { error: "Prompt is required" }
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return { error: "Anthropic API key not configured" }
    }

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    })

    const response = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229", // Use Claude 3 Sonnet model
      max_tokens: 1000,
      temperature: 0.7,
      system: "You are a helpful assistant for Catholic homily preparation. Provide thoughtful, theologically sound content that helps priests and deacons prepare meaningful homilies.",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    })

    const content = response.content[0]?.text || ''

    if (!content) {
      return { error: "No content generated from AI" }
    }

    return {
      success: true,
      content,
      usage: {
        prompt_tokens: response.usage.input_tokens,
        completion_tokens: response.usage.output_tokens,
        total_tokens: response.usage.input_tokens + response.usage.output_tokens
      }
    }

  } catch (error: any) {
    console.error('Error generating AI content with Claude:', error)
    
    // Provide more specific error messages for Anthropic API
    if (error.status === 429) {
      return { error: 'Rate limit or quota exceeded. Please try again later.' }
    }
    
    if (error.status === 401) {
      return { error: 'Invalid Anthropic API key configured.' }
    }
    
    if (error.status === 400) {
      return { error: 'Bad request. Please check your prompt and try again.' }
    }
    
    return { error: 'Failed to generate AI content with Claude. Please try again.' }
  }
}
