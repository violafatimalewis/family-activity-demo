# Family Activity Finder - Specification

## Overview
A web application that helps parents find weekend activities for their families. Parents enter their city, children's ages, availability, and preferences, and receive 5 AI-powered activity recommendations with bold titles and detailed descriptions and a relevant emoji icon

---

## Requirements

### Functional Requirements
1. **Input Form**: Collect the following from users:
   - City (text input)
   - Kids ages (text input comma-separated numbers)
   - Availability (text input e.g., "Saturday afternoon", "Sunday morning")
   - Distance willing to travel (slider for travel distance in miles, numeric input)
   - Additional preferences (text input area, optional)

2. **Activity Recommendations**: Generate 5 recommendations with:
   - Bold title for each activity
   - relevant emoji icon 
   - 2-4 sentences describing the activity
   - Age appropriateness
   - Practical details (location, cost estimate, duration)
   - distance from users city

3. **Web Search Integration**: Use Claude's web search tool to find real, current activities and events in the specified location

4. **Display Results**: Show recommendations in clean, readable format with clear separation between activities

### Non-Functional Requirements
- Simple, intuitive UI
- Fast response time (< 10 seconds for results)
- Mobile-responsive design
- Clear error messages
- API key security (never exposed to client)

---

## Tech Stack

### Frontend
- **React** (v18+)
- **Vite** (build tool)
- **CSS** (simple styling)
- **Axios** (HTTP client for API calls)

### Backend
- **Node.js** (v18+)
- **Express** (v4+)
- **Anthropic SDK** (`@anthropic-ai/sdk`)
- **dotenv** (environment variables)
- **cors** (enable frontend-backend communication)

### API
- **Claude API** (Sonnet 4.5 model)
- **Web Search Tool** (`web_search_20250305`)

---

## Design Guidelines

### UI Principles
- **Simple and clean**: Minimal design, focus on functionality
- **Family-friendly**: Large, readable text and clear labels
- **Mobile-first**: Responsive layout that works on phones and tablets
- **Accessibility**: Proper labels, contrast, and semantic HTML

### Color Scheme
- Primary: Blue/teal (trustworthy, family-friendly)
- Secondary: Warm accent color (orange/yellow)
- Background: Light gray or white
- Text: Dark gray for readability

### Layout
```
┌─────────────────────────────────────┐
│          Family Activity Finder      │
│                                      │
│  [City Input]                        │
│  [Kids Ages Input]                   │
│  [Availability Input]                │
│  [Distance Slider/Input]             │
│  [Preferences Textarea]              │
│                                      │
│        [Find Activities Button]      │
└─────────────────────────────────────┘

Results Page:
┌─────────────────────────────────────┐
│    Your Activity Recommendations     │
│                                      │
│  1. **Activity Title**               │
│     Description text here...         │
│                                      │
│  2. **Activity Title**               │
│     Description text here...         │
│                                      │
│  [... 3 more activities]             │
│                                      │
│     [Search Again Button]            │
└─────────────────────────────────────┘
```

---

## Project Structure

```
family-activity-finder/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchForm.jsx
│   │   │   ├── Results.jsx
│   │   │   └── ActivityCard.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── App.css
│   ├── package.json
│   └── vite.config.js
│
├── server/                 # Express backend
│   ├── routes/
│   │   └── activities.js
│   ├── services/
│   │   └── claude.js      # Claude API integration
│   ├── index.js           # Express app entry
│   ├── package.json
│   └── .env               # API keys (not committed)
│
├── .gitignore
└── README.md
```

---

## Milestones

### Milestone 1: UI Setup with Dummy Data

**Goal**: Build the complete React frontend with static/dummy data to validate UX and layout

**Tasks**:
1. Initialize React project with Vite
2. Create `SearchForm` component with all input fields
3. Create `Results` component to display recommendations
4. Create `ActivityCard` component for individual activities
5. Add basic styling (CSS)
6. Create dummy data (5 sample activities) for testing
7. Wire up form submission to display dummy results
8. Make responsive for mobile/tablet/desktop

**Success Criteria**:
- User can fill out form and see 5 dummy activities
- UI looks clean and is easy to use
- Works on mobile and desktop browsers

---

### Milestone 2: Claude API Integration with Web Search

**Goal**: Build Express backend and integrate Claude API with web search tool to generate real recommendations

**Tasks**:
1. Initialize Express server project
2. Install dependencies: `express`, `@anthropic-ai/sdk`, `dotenv`, `cors`
3. Create `.env` file for `ANTHROPIC_API_KEY`
4. Build `/api/activities` POST endpoint
5. Implement Claude service with web search tool
6. Update React frontend to call backend API
7. Add loading state and error handling
8. Test end-to-end flow with real searches
9. Use https://code.claude.com/docs for implementing claude api and web search

**Detailed task list**: See `todo.md` for Milestone 1 tasks

**Prompt Template**: See `prompt.md` for the complete Claude API prompt template with:
- Full prompt structure with all 5 input fields
- Expected response format (emoji, title, description, distance, source)
- Implementation code snippet
- Prompt engineering tips

**Claude API Implementation**:
```javascript
// server/services/claude.js
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function getActivityRecommendations(params) {
  const { city, ages, availability, distance, preferences } = params;

  // See prompt.md for the complete prompt template
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

**Success Criteria**:
- User enters search criteria and receives 5 real, relevant activities
- Activities are based on current web search results (real events/locations)
- Response time < 10 seconds
- Error handling works (invalid city, API failures)

---

### Milestone 3: Polish and Deployment

**Goal**: Refine UX, add error handling, optimize performance, and prepare for deployment

**Tasks**:
1. **Enhanced Error Handling**:
   - Display user-friendly error messages
   - Handle API rate limits and timeouts
   - Validate all inputs server-side

2. **UX Improvements**:
   - Add loading spinner with status messages
   - Add "Search Again" button that preserves previous inputs
   - Add citations/sources for activities (from web search)

3. **Performance Optimization**:
   - Add caching for identical searches (5-minute TTL)
   - Optimize Claude prompts for faster responses

4. **Deployment**:
   - Document setup and installation
   - Deploy frontend (Vercel, Netlify) and backend (Railway, Render)
   - Set up environment variables in hosting platforms

**Success Criteria**:
- Application is stable and handles errors gracefully
- Performance is optimized (< 10s response time)
- Deployed and accessible online

---

## API Documentation

### POST `/api/activities`

**Request Body**:
```json
{
  "city": "Seattle",
  "ages": "5, 8",
  "availability": "Saturday afternoon",
  "distance": 10,
  "preferences": "outdoor activities, educational"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "activities": "**Museum of Flight**\n\nPerfect for curious kids aged 5-8...\n\n**Discovery Park**\n\n..."
}
```

**Response** (400 Bad Request):
```json
{
  "success": false,
  "error": "City is required"
}
```

---

## Security Considerations

1. **API Key Protection**: Store in `.env` file on server only, never expose to frontend
2. **Input Validation**: Validate all inputs server-side
3. **Rate Limiting**: Implement rate limiting on backend (e.g., 10 requests/minute per IP)
4. **CORS**: Configure CORS to allow only frontend origin

---

## Cost Estimation

### Claude API Costs
- **Web Search**: $10 per 1,000 searches
- **Token Usage**: ~2,000 tokens per request (prompt + response)
- **Total per search**: ~$0.034 ($0.01 for search + $0.024 for tokens)
- **100 searches**: ~$3.40

### Optimization Tips
- Cache identical searches for 5-10 minutes
- Use `max_uses: 3-5` to limit web searches per request
- Monitor usage in Anthropic Console
