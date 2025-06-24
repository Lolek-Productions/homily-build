"use server"

import OpenAI from 'openai'

export async function generateAIContent(step, homilyData, userId) {
  try {
    // Validate inputs
    if (!userId) {
      return { error: "User authentication required" }
    }

    if (!step || typeof step !== 'number' || step < 3 || step > 6) {
      return { error: "Invalid step provided. Must be between 3 and 6." }
    }

    if (!homilyData || typeof homilyData !== 'object') {
      return { error: "Invalid homily data provided" }
    }

    if (!process.env.OPENAI_API_KEY) {
      return { error: "OpenAI API key not configured" }
    }

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    let prompt = ''
    
    switch (step) {
      case 3: // Definitions
        if (!homilyData.title) {
          return { error: "Title is required for generating definitions" }
        }
        prompt = `Based on the homily title "${homilyData.title}" and readings "${homilyData.readings || 'Not specified'}", provide key theological definitions and concepts that would be important for understanding this homily. Focus on biblical, theological, and liturgical terms that need clarification.`
        break
        
      case 4: // First Set of Questions
        if (!homilyData.title) {
          return { error: "Title is required for generating questions" }
        }
        prompt = `Based on the homily title "${homilyData.title}", readings "${homilyData.readings || 'Not specified'}", and definitions "${homilyData.definitions || 'Not specified'}", generate thoughtful questions that explore the main themes and messages. These should be initial questions that help frame the homily's direction.`
        break
        
      case 5: // Second Set of Questions
        if (!homilyData.first_set_of_questions) {
          return { error: "First set of questions is required for generating second set" }
        }
        prompt = `Building on the first set of questions: "${homilyData.first_set_of_questions}", generate deeper, more refined questions that explore the themes further. Consider practical applications, spiritual insights, and connections to daily life.`
        break
        
      case 6: // Final Draft
        if (!homilyData.title) {
          return { error: "Title is required for generating final draft" }
        }
        prompt = `Based on all the preparation work - Title: "${homilyData.title}", Readings: "${homilyData.readings || 'Not specified'}", Definitions: "${homilyData.definitions || 'Not specified'}", First Questions: "${homilyData.first_set_of_questions || 'Not specified'}", Second Questions: "${homilyData.second_set_of_questions || 'Not specified'}" - write a complete homily that addresses these themes and questions in a coherent, inspiring message.`
        break
        
      default:
        return { error: "Invalid step provided" }
    }

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
