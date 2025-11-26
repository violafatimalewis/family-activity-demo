# Claude API Prompt Template

## Prompt for Family Activity Recommendations

This prompt will be used in Milestone 2 when calling the Claude API with the web search tool enabled.

---

## Prompt Structure

```
Find 5 real weekend activities in {city} for a family with children aged {ages}.

Search Parameters:
- Location: {city}
- Children's ages: {ages}
- Availability: {availability}
- Maximum travel distance: {distance} miles from {city}
- Additional preferences: {preferences}

Please search the web for current, real activities and events in {city} and the surrounding area (within {distance} miles). Return 5 diverse activity recommendations.

For each recommendation, provide:
1. A relevant emoji icon that represents the activity
2. Bold title of the activity
3. 2-4 sentences describing the activity, including:
   - Why it's suitable for children aged {ages}
   - Practical details (estimated cost, typical duration)
   - What makes it special or unique
4. Distance from {city} (approximate)
5. Include the source URL if available

Format each recommendation exactly as:

[emoji] **[Activity Title]**
[Description with age appropriateness and practical details]
Distance: [X] miles from {city}
Source: [URL if available]

---

Make sure the activities are:
- Real places or events that currently exist
- Age-appropriate for children aged {ages}
- Within {distance} miles of {city}
- Available on weekends or during {availability}
- Diverse in type (mix of indoor/outdoor, educational/recreational, etc.)
- Aligned with preferences: {preferences}

Return all 5 recommendations in a clear, easy-to-read format.
```

---

## Input Fields

The prompt uses the following variables that will be populated from the user's form input:

1. **{city}**: User's city (e.g., "Seattle", "Austin", "Boston")
2. **{ages}**: Comma-separated children's ages (e.g., "5, 8", "3, 6, 10")
3. **{availability}**: When they're free (e.g., "Saturday afternoon", "Sunday morning", "any weekend day")
4. **{distance}**: Maximum miles willing to travel (e.g., "10", "25", "50")
5. **{preferences}**: Optional additional preferences (e.g., "outdoor activities, educational, budget-friendly", "indoor activities for rainy days", "free or low-cost options")

---

## Example Prompt (with values filled in)

```
Find 5 real weekend activities in Seattle for a family with children aged 5, 8.

Search Parameters:
- Location: Seattle
- Children's ages: 5, 8
- Availability: Saturday afternoon
- Maximum travel distance: 15 miles from Seattle
- Additional preferences: outdoor activities, educational, hands-on experiences

Please search the web for current, real activities and events in Seattle and the surrounding area (within 15 miles). Return 5 diverse activity recommendations.

For each recommendation, provide:
1. A relevant emoji icon that represents the activity
2. Bold title of the activity
3. 2-4 sentences describing the activity, including:
   - Why it's suitable for children aged 5, 8
   - Practical details (estimated cost, typical duration)
   - What makes it special or unique
4. Distance from Seattle (approximate)
5. Include the source URL if available

Format each recommendation exactly as:

[emoji] **[Activity Title]**
[Description with age appropriateness and practical details]
Distance: [X] miles from Seattle
Source: [URL if available]

---

Make sure the activities are:
- Real places or events that currently exist
- Age-appropriate for children aged 5, 8
- Within 15 miles of Seattle
- Available on weekends or during Saturday afternoon
- Diverse in type (mix of indoor/outdoor, educational/recreational, etc.)
- Aligned with preferences: outdoor activities, educational, hands-on experiences

Return all 5 recommendations in a clear, easy-to-read format.
```

---

## Expected Response Format

```
🔬 **Pacific Science Center**
Perfect for curious minds aged 5-8, featuring hands-on exhibits, interactive displays, and a tropical butterfly house. Kids can explore science through play in the Tinker Tank Maker Space and watch live science demonstrations throughout the day. Typical visit lasts 3-4 hours with admission around $25-30 per person.
Distance: 2 miles from Seattle
Source: https://pacificsciencecenter.org

🌲 **Discovery Park**
Seattle's largest park offers 534 acres of forest trails, meadows, and beaches perfect for elementary-aged explorers. The easy 2.8-mile Loop Trail is manageable for young kids, and the beach at West Point Lighthouse is ideal for tide pooling and wildlife watching. Free admission, plan 2-3 hours.
Distance: 7 miles from Seattle
Source: https://www.seattle.gov/parks/find/parks/discovery-park

🎨 **Seattle Children's Museum**
Designed specifically for ages 0-10, featuring 22,000 square feet of interactive exhibits including a mountain forest, global village, and art studio. Kids can engage in imaginative play, creative art projects, and cultural exploration. Admission is $12-15, typically 2-3 hours.
Distance: 2 miles from Seattle
Source: https://thechildrensmuseum.org

🚢 **Museum of Flight**
Aviation enthusiasts aged 5-8 will love exploring real aircraft, flight simulators, and space exhibits. The Kids Flight Zone offers hands-on activities, and they can board historic planes including Air Force One. General admission around $25 adults, $15-20 kids, allow 3-4 hours.
Distance: 11 miles from Seattle
Source: https://www.museumofflight.org

🍓 **Remlinger Farms**
Working farm and amusement park combo with u-pick berries, petting zoo, train rides, and kid-sized roller coasters. Perfect blend of educational farm experience and entertainment for elementary-aged kids. Admission $20-25 per person, plan for 3-5 hours.
Distance: 32 miles from Seattle
Source: https://www.remlingerfarms.com
```

---

## Implementation Notes

### For Milestone 2 (server/services/claude.js):

```javascript
export async function getActivityRecommendations(params) {
  const { city, ages, availability, distance, preferences } = params;

  // Build the prompt using template literals
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

  return message.content[0].text;
}
```

---

## Prompt Engineering Tips

1. **Be specific about format**: The prompt clearly specifies the exact format expected (emoji, title, description, distance, source)

2. **Include all constraints**: Age appropriateness, distance limits, availability, and preferences are all clearly stated

3. **Request web search**: Explicitly asks Claude to search the web for "current, real activities"

4. **Provide structure**: Uses numbered lists and clear sections to organize requirements

5. **Ask for diversity**: Requests a mix of activity types to provide variety

6. **Include practical details**: Asks for cost and duration estimates that parents need

7. **Request sources**: Asks for URLs so users can get more information

8. **Set max_uses**: Limits web search to 5 uses (one per activity recommendation) to manage costs

---

## Testing the Prompt

When testing in Milestone 2, verify that responses include:
- ✅ Emoji icons for each activity
- ✅ Bold titles
- ✅ 2-4 sentence descriptions
- ✅ Age appropriateness mentioned
- ✅ Cost and duration estimates
- ✅ Distance from specified city
- ✅ Source URLs when available
- ✅ Activities are real and current
- ✅ Activities are within specified distance
- ✅ Good variety of activity types
