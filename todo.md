# Milestone 1: UI Setup with Dummy Data - Task List

## Goal
Build the complete React frontend with static/dummy data to validate UX and layout

---

## Tasks

### 1. Project Setup
- [x] Initialize React project with Vite in `client` directory
  - Run: `npm create vite@latest client -- --template react`
  - Navigate to client folder and install dependencies
  - Test that dev server runs successfully

### 2. Project Structure
- [x] Create folder structure:
  ```
  client/src/
  ├── components/
  │   ├── SearchForm.jsx
  │   ├── Results.jsx
  │   └── ActivityCard.jsx
  ├── services/
  │   └── api.js (placeholder for Milestone 2)
  ├── data/
  │   └── dummyData.js (sample activities)
  ├── App.jsx
  ├── main.jsx
  └── App.css
  ```

### 3. Create Dummy Data
- [x] Create `src/data/dummyData.js` with 5 sample activities
  - Each activity should have:
    - `emoji` (relevant icon)
    - `title` (bold-worthy name)
    - `description` (2-4 sentences)
    - `distance` (miles from city)
    - `source` (example URL)
  - Example structure:
    ```javascript
    export const dummyActivities = [
      {
        id: 1,
        emoji: '🔬',
        title: 'Pacific Science Center',
        description: 'Perfect for curious minds aged 5-8...',
        distance: 2,
        source: 'https://pacificsciencecenter.org'
      },
      // ... 4 more activities
    ];
    ```

### 4. Build SearchForm Component
- [x] Create `src/components/SearchForm.jsx`
  - Input field: **City** (text input, required)
  - Input field: **Kids Ages** (text input, placeholder: "e.g., 5, 8")
  - Input field: **Availability** (text input, placeholder: "e.g., Saturday afternoon")
  - Input field: **Distance** (range slider 0-50 miles with number display)
  - Input field: **Preferences** (textarea, optional)
  - Submit button: "Find Activities"
  - Basic client-side validation (city required)
  - Pass form data to parent component on submit

### 5. Build ActivityCard Component
- [x] Create `src/components/ActivityCard.jsx`
  - Display emoji icon (large, prominent)
  - Display bold title
  - Display description text
  - Display distance: "X miles from [city]"
  - Display source link (if available): "Learn more →"
  - Make it visually distinct (card-style with border/shadow)

### 6. Build Results Component
- [x] Create `src/components/Results.jsx`
  - Header: "Your Activity Recommendations"
  - Display search parameters summary (city, ages, availability)
  - Map through activities array and render ActivityCard for each
  - "Search Again" button to reset form
  - Handle empty state (no results)

### 7. Wire Up App Component
- [x] Update `src/App.jsx`
  - State management:
    - `showResults` (boolean) - toggle between form and results view
    - `searchParams` (object) - store form submission data
    - `activities` (array) - store activities to display (dummy data for M1)
  - Render SearchForm when `showResults === false`
  - Render Results when `showResults === true`
  - Handle form submission:
    - Store search parameters
    - Load dummy data into activities state
    - Set `showResults = true`
  - Handle "Search Again" click:
    - Set `showResults = false`
    - Clear/reset form (optional)

### 8. Add Styling (CSS)
- [x] Update `src/App.css` with:
  - **Layout**: Center container, max-width 800px, padding
  - **Typography**:
    - Large, friendly heading font
    - Readable body text (16-18px)
    - Bold titles for activities
  - **Color Scheme**:
    - Primary: Blue/teal (#0ea5e9 or similar)
    - Secondary: Warm accent (#f59e0b or similar)
    - Background: Light gray (#f9fafb)
    - Text: Dark gray (#1f2937)
  - **Form Styling**:
    - Clean input fields with borders
    - Large, prominent submit button
    - Proper spacing between fields
    - Labels above inputs
  - **Card Styling**:
    - White background
    - Border or subtle shadow
    - Padding and margin for separation
    - Emoji prominent (2-3em size)
  - **Responsive Design**:
    - Mobile-first approach
    - Stack elements vertically on mobile
    - Adjust font sizes for readability
    - Ensure touch-friendly buttons (min 44px height)

### 9. Implement Range Slider for Distance
- [x] Style range slider input
  - Display current value next to slider
  - Update value dynamically as user drags
  - Range: 0-50 miles
  - Default: 15 miles

### 10. Add Form Validation
- [x] Client-side validation:
  - City field is required
  - Show error message if submitted empty
  - Optional: Validate ages format (numbers, commas)
  - Disable submit button until required fields filled

### 11. Test Responsive Design
- [x] Test on different screen sizes:
  - Mobile (320px - 480px)
  - Tablet (768px - 1024px)
  - Desktop (1200px+)
- [x] Verify:
  - Form inputs are usable on mobile
  - Cards stack properly on small screens
  - Text is readable at all sizes
  - Buttons are touch-friendly
  - No horizontal scrolling

### 12. Final Testing & Refinement
- [x] Test complete user flow:
  1. Fill out form with sample data
  2. Submit form
  3. View 5 dummy activities
  4. Click "Search Again"
  5. Return to form
- [x] Check for visual issues:
  - Spacing and alignment
  - Color contrast
  - Font sizes
  - Button hover states
- [x] Ensure clean console (no errors)
- [x] Verify accessibility:
  - All inputs have labels
  - Form can be navigated with keyboard
  - Semantic HTML structure

---

## Success Criteria Checklist

- [x] User can fill out all form fields
- [x] Form validates required fields
- [x] Submitting form displays 5 dummy activities
- [x] Each activity shows emoji, title, description, distance, and source
- [x] UI looks clean and professional
- [x] Design is mobile-responsive
- [x] "Search Again" button returns to form
- [x] No console errors
- [x] Works in Chrome, Firefox, Safari

---

## Estimated Time

- Project setup: 30 minutes
- Components development: 2-3 hours
- Styling: 1-2 hours
- Testing & refinement: 30-60 minutes
- **Total: 4-6 hours**

---

## Notes

- Keep it simple! Don't over-engineer
- Focus on clean, readable code
- Use semantic HTML (form, section, article, etc.)
- Comment complex logic
- Dummy data should be realistic and match expected API format
- This milestone is about validating UX before building backend

---

## Ready for Milestone 2 When:

- ✅ All tasks above completed
- ✅ UI/UX approved by stakeholders
- ✅ No major bugs or visual issues
- ✅ Code is clean and well-organized
- ✅ Ready to replace dummy data with real API calls

---
---

# Milestone 2: Claude API Integration with Web Search - Task List

## Goal
Build Express backend and integrate Claude API with web search tool to generate real, current activity recommendations

---

## Tasks

### 1. Backend Project Setup
- [ ] Initialize Node.js project in `server` directory
  - Create server folder: `mkdir server`
  - Initialize npm: `npm init -y`
  - Install dependencies: `express`, `@anthropic-ai/sdk`, `dotenv`, `cors`

### 2. Environment Configuration
- [ ] Create `.env` file in server directory
  - Add `ANTHROPIC_API_KEY=your-api-key-here`
  - Add `PORT=3001`
  - **IMPORTANT**: Never commit this file to git!
- [ ] Update `.gitignore` to include:
  - `.env`
  - `node_modules/`
  - `server/.env`

### 3. Build Express Server
- [ ] Create `server/index.js`
  - Import Express and configure middleware
  - Set up CORS to allow frontend requests
  - Parse JSON request bodies
  - Create basic health check route (`GET /health`)
  - Start server on port 3001

### 4. Create Claude Service
- [ ] Create `server/services/claude.js`
  - Import Anthropic SDK
  - Initialize Claude client with API key from environment
  - Create `getActivityRecommendations()` function
  - Build prompt using template from `prompt.md`
  - Configure web search tool: `type: 'web_search_20250305'`
  - Set `max_uses: 5` to limit searches
  - Handle API errors and timeouts
  - Parse and return Claude's response

### 5. Build Activities API Endpoint
- [ ] Create `server/routes/activities.js`
  - Define POST `/api/activities` route
  - Validate request body (city, ages, availability, distance required)
  - Call Claude service with search parameters
  - Return formatted response with activities
  - Handle errors (400 for validation, 500 for server errors)
  - Add response time logging

### 6. Test Backend API
- [ ] Test with Postman or curl:
  - POST request to `http://localhost:3001/api/activities`
  - Include test data: city, ages, availability, distance, preferences
  - Verify Claude API returns 5 activities with web search results
  - Check response includes emojis, titles, descriptions, distances, sources
  - Test error cases (missing required fields, invalid API key)

### 7. Update Frontend to Call Backend
- [ ] Create `client/src/services/api.js`
  - Import axios (install: `npm install axios`)
  - Create API client with base URL: `http://localhost:3001`
  - Export `fetchActivities()` function that POSTs to `/api/activities`
  - Handle network errors

### 8. Update App Component for Real API
- [ ] Modify `client/src/App.jsx`
  - Import `fetchActivities` from services/api.js
  - Add loading state: `const [isLoading, setIsLoading] = useState(false)`
  - Add error state: `const [error, setError] = useState(null)`
  - Update `handleSearch` to:
    - Set `isLoading = true`
    - Call `fetchActivities(formData)`
    - Parse response and set activities
    - Set `isLoading = false`
    - Handle errors and display error messages

### 9. Add Loading State UI
- [ ] Create loading indicator
  - Add loading spinner or skeleton screens
  - Display "Searching for activities..." message
  - Show "Searching the web..." status
  - Disable form submission while loading

### 10. Add Error Handling UI
- [ ] Create error display component
  - Show user-friendly error messages
  - Handle different error types:
    - Network errors ("Can't connect to server")
    - API errors ("Failed to get recommendations")
    - Validation errors (from backend)
  - Add "Try Again" button to retry search

### 11. Test End-to-End Flow
- [ ] Run full integration test:
  1. Start backend server (`node server/index.js`)
  2. Start frontend dev server (already running)
  3. Fill out search form with real data
  4. Submit and verify loading state appears
  5. Confirm 5 REAL activities are returned (not dummy data!)
  6. Verify activities include current, web-searched results
  7. Check activities have emojis, distances, source URLs
  8. Test "Search Again" with different cities/parameters
  9. Test error handling (stop backend, submit form)

### 12. Parse and Format Claude Response
- [ ] Update claude.js to parse response properly
  - Extract activity data from Claude's text response
  - Handle different response formats
  - Ensure emojis, titles, descriptions are properly formatted
  - Extract distances and source URLs
  - Return structured JSON array of activities

### 13. Add Response Caching (Optional but Recommended)
- [ ] Implement simple in-memory cache
  - Cache identical searches for 5-10 minutes
  - Create cache key from search parameters
  - Check cache before calling Claude API
  - Reduces API costs and improves response time

---

## Success Criteria Checklist

- [ ] Express backend server runs on port 3001
- [ ] `/api/activities` endpoint accepts POST requests
- [ ] Claude API integration works with web search tool enabled
- [ ] Frontend successfully calls backend API
- [ ] User sees loading state while search is in progress
- [ ] 5 REAL activities are returned (from web search, not dummy data)
- [ ] Activities include: emoji, title, description, distance, source URL
- [ ] Activities are current and relevant to the searched city
- [ ] Error handling works (displays errors to user)
- [ ] "Search Again" works with new parameters
- [ ] No CORS errors between frontend and backend
- [ ] Response time is < 10 seconds
- [ ] Console shows no critical errors

---

## Estimated Time

- Backend setup: 1 hour
- Claude API integration: 2-3 hours
- Frontend API connection: 1-2 hours
- Loading & error states: 1 hour
- Testing & debugging: 2-3 hours
- **Total: 7-10 hours**

---

## Technical Architecture Notes

**How it works:**
1. User submits form in React frontend
2. Frontend calls Express backend API endpoint
3. Backend receives request, validates parameters
4. Backend calls Claude API with web search tool enabled
5. Claude searches the web for real activities in the specified city
6. Claude returns 5 activity recommendations
7. Backend parses and formats the response
8. Backend sends JSON response back to frontend
9. Frontend displays real activities to user

**Data Flow:**
```
User Input → SearchForm → App.handleSearch()
→ api.fetchActivities() → POST /api/activities
→ claude.getActivityRecommendations() → Claude API + Web Search
→ Parse Response → Return to Frontend → Display in Results
```

**Key Concepts:**
- **REST API**: Backend exposes HTTP endpoints that frontend calls
- **Environment Variables**: API keys stored securely in .env file
- **CORS**: Cross-Origin Resource Sharing allows frontend to call backend
- **Async/Await**: Handle asynchronous API calls cleanly
- **Error Handling**: Graceful degradation when things go wrong
- **Web Search Tool**: Claude uses real-time web search to find current activities

---

## Reference Files

- See `prompt.md` for the complete Claude API prompt template
- See `spec.md` for Milestone 2 implementation details
- See Claude Code docs: https://code.claude.com/docs

---

## Ready for Milestone 3 When:

- [ ] All Milestone 2 tasks completed
- [ ] Backend and frontend fully integrated
- [ ] Real activities returned from Claude API
- [ ] Error handling tested and working
- [ ] Ready to add polish, caching, and deployment features
