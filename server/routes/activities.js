const express = require('express');
const { getActivityRecommendations } = require('../services/claude');

const router = express.Router();

/**
 * POST /api/activities
 * Get activity recommendations based on search parameters
 */
router.post('/', async (req, res) => {
  const startTime = Date.now();

  try {
    // Extract and validate request body
    const { city, ages, availability, distance, preferences } = req.body;

    // Validate required fields
    if (!city || !city.trim()) {
      return res.status(400).json({
        success: false,
        error: 'City is required'
      });
    }

    if (!ages || !ages.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Kids ages are required'
      });
    }

    if (!availability || !availability.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Availability is required'
      });
    }

    if (!distance || isNaN(distance)) {
      return res.status(400).json({
        success: false,
        error: 'Distance must be a valid number'
      });
    }

    console.log(`📝 New search request: ${city}, ages ${ages}, ${availability}, ${distance} miles`);

    // Call Claude API service
    const activities = await getActivityRecommendations({
      city: city.trim(),
      ages: ages.trim(),
      availability: availability.trim(),
      distance: parseInt(distance),
      preferences: preferences?.trim() || ''
    });

    // Calculate response time
    const responseTime = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`⏱️  Response time: ${responseTime}s`);

    // Return success response
    res.json({
      success: true,
      activities,
      searchTime: `${responseTime}s`,
      searchParams: {
        city: city.trim(),
        ages: ages.trim(),
        availability: availability.trim(),
        distance: parseInt(distance),
        preferences: preferences?.trim() || 'None'
      }
    });

  } catch (error) {
    console.error('❌ Error in /api/activities:', error);

    // Return error response
    res.status(500).json({
      success: false,
      error: 'Failed to generate activity recommendations. Please try again later.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
