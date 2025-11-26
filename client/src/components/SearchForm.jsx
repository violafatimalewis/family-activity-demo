import { useState } from 'react';

function SearchForm({ onSearch }) {
  const [formData, setFormData] = useState({
    city: '',
    ages: '',
    availability: '',
    distance: 15,
    preferences: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.ages.trim()) {
      newErrors.ages = 'Kids ages are required';
    }
    if (!formData.availability.trim()) {
      newErrors.availability = 'Availability is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSearch(formData);
    }
  };

  return (
    <div className="search-form-container">
      <h2>Find Activities</h2>
      <form onSubmit={handleSubmit} className="search-form">
        <div className="form-group">
          <label htmlFor="city">City *</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="e.g., Seattle"
            className={errors.city ? 'error' : ''}
          />
          {errors.city && <span className="error-message">{errors.city}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="ages">Kids Ages *</label>
          <input
            type="text"
            id="ages"
            name="ages"
            value={formData.ages}
            onChange={handleChange}
            placeholder="e.g., 5, 8"
            className={errors.ages ? 'error' : ''}
          />
          {errors.ages && <span className="error-message">{errors.ages}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="availability">Availability *</label>
          <input
            type="text"
            id="availability"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            placeholder="e.g., Saturday afternoon"
            className={errors.availability ? 'error' : ''}
          />
          {errors.availability && <span className="error-message">{errors.availability}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="distance">
            Distance: {formData.distance} miles
          </label>
          <input
            type="range"
            id="distance"
            name="distance"
            min="0"
            max="50"
            value={formData.distance}
            onChange={handleChange}
            className="distance-slider"
          />
        </div>

        <div className="form-group">
          <label htmlFor="preferences">Other Preferences (Optional)</label>
          <textarea
            id="preferences"
            name="preferences"
            value={formData.preferences}
            onChange={handleChange}
            placeholder="e.g., outdoor activities, educational"
            rows="3"
          />
        </div>

        <button type="submit" className="submit-button">
          Find Activities
        </button>
      </form>
    </div>
  );
}

export default SearchForm;
