const Anthropic = require('@anthropic-ai/sdk');

// Initialize Claude client with API key from environment
const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * Get activity recommendations using Claude AI with web search
 * @param {Object} params - Search parameters
 * @param {string} params.city - City name
 * @param {string} params.ages - Children's ages (comma-separated)
 * @param {string} params.availability - When they're available
 * @param {number} params.distance - Maximum distance in miles
 * @param {string} params.preferences - Optional preferences
 * @returns {Promise<string>} Activity recommendations from Claude
 */
async function getActivityRecommendations(params) {
  const { city, ages, availability, distance, preferences } = params;

  // Build the prompt using template from prompt.md
  const prompt = `Find 5 real weekend activities in ${city} for a family with children aged ${ages}.

Search Parameters:
- Location: ${city}
- Children's ages: ${ages}
- Availability: ${availability}
- Maximum travel distance: ${distance} miles from ${city}
- Additional preferences: ${preferences || 'no specific preferences'}

Please search the web for current, timely and real activities and events in ${city} and the surrounding area (within ${distance} miles). Return 5 diverse activity recommendations.

For each recommendation, provide:
1. A relevant emoji icon that represents the activity
2. Bold title of the activity
3. 2-4 sentences describing the activity, including:
   - Why it's suitable for children aged ${ages}
   - Practical details (estimated cost, typical duration)
   - What makes it special or unique
4. Distance from ${city} (approximate)
5. Include the source URL if available

Format each recommendation exactly as:

[emoji] **[Activity Title]**
[Description with age appropriateness and practical details]
Distance: [X] miles from ${city}
Source: [URL if available]

---

Make sure the activities are:
- Real places or events that currently exist
- Age-appropriate for children aged ${ages}
- Within ${distance} miles of ${city}
- Available on weekends or during ${availability}
- Diverse in type (mix of indoor/outdoor, educational/recreational, etc.)
${preferences ? `- Aligned with preferences: ${preferences}` : ''}

Return all 5 recommendations in a clear, easy-to-read format.`;

  try {
    console.log(`🔍 Searching for activities in ${city}...`);

    // Call Claude API with web search tool enabled
    const message = await client.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 2500,
      messages: [{ role: 'user', content: prompt }],
      tools: [
        {
          type: 'web_search_20250305',
          name: 'web_search',
          max_uses: 5
        }
      ]
    });

    console.log('✅ Successfully received recommendations from Claude');

    // Extract text from response (when using tools, text is in separate content blocks)
    const textBlocks = message.content.filter(block => block.type === 'text');

    if (textBlocks.length === 0) {
      throw new Error('No text content received from Claude');
    }

    // Combine all text blocks into a single response
    const responseText = textBlocks.map(block => block.text).join('\n');

    return responseText;

  } catch (error) {
    console.error('❌ Error calling Claude API:', error.message);
    throw new Error(`Failed to get activity recommendations: ${error.message}`);
  }
}

module.exports = {
  getActivityRecommendations
};
