import React, { useState, useEffect } from 'react';
import { MapPin, ArrowRight, Info, ChevronDown, AlertCircle } from 'lucide-react';
import Button from '../shared/Button';
import { DISTRICT_CATEGORIES, DISTRICT_NAMES } from '../../lib/districtCategories';

/**
 * Main Business Analysis Form Component
 * Collects micro-entrepreneur inputs, provides dynamic margin capital preview,
 * validates inputs, and triggers analysis.
 */
export default function InputForm({ onSubmit, currentLang = 'en', initialData = null }) {
  // Form State
  const [formData, setFormData] = useState({
    location: initialData?.location || 'Ghaziabad',
    capital: initialData?.marginCapital ? String(initialData.marginCapital) : '',
    category: initialData?.category || 'Retail',
    description: initialData?.description || '',
  });

  // Validation Errors State
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Available categories based on active location selection
  const availableCategories = DISTRICT_CATEGORIES[formData.location] || ['Retail', 'Dairy'];

  // Reset selected category if not available in newly selected district
  useEffect(() => {
    if (formData.location && availableCategories.length > 0 && !availableCategories.includes(formData.category)) {
      setFormData((prev) => ({
        ...prev,
        category: availableCategories[0] || '',
      }));
    }
  }, [formData.location, availableCategories, formData.category]);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for the current field as the user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};

    if (!formData.location.trim()) {
      newErrors.location =
        currentLang === 'hi'
          ? 'कृपया अपने गांव, ब्लॉक या जिले का नाम दर्ज करें'
          : 'Please enter your village, block, or district';
    }

    const capitalNum = parseFloat(formData.capital.replace(/,/g, ''));
    if (!formData.capital || isNaN(capitalNum) || capitalNum <= 0) {
      newErrors.capital =
        currentLang === 'hi'
          ? 'कृपया एक वैध पूंजी राशि दर्ज करें (कम से कम ₹1,000)'
          : 'Please enter a valid margin capital amount (min ₹1,000)';
    }

    if (!formData.category) {
      newErrors.category =
        currentLang === 'hi'
          ? 'कृपया व्यवसाय की श्रेणी चुनें'
          : 'Please select a business category';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Format currency display helper (e.g. 100000 -> 1,00,000)
  const formatIndianCurrency = (num) => {
    if (!num || isNaN(num)) return '';
    return new Intl.NumberFormat('en-IN').format(num);
  };

  const parsedCapital = parseFloat(formData.capital.replace(/,/g, '')) || 0;
  const estimatedProjectCost = parsedCapital > 0 ? parsedCapital * 10 : 0;

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Prepare clean payload for API / Result navigation
    const payload = {
      location: formData.location.trim(),
      marginCapital: parsedCapital,
      category: formData.category,
      description: formData.description.trim(),
      estimatedProjectCost: estimatedProjectCost,
      submittedAt: new Date().toISOString(),
    };

    if (onSubmit) {
      onSubmit(payload);
    }
  };

  return (
    <section className="form-section" id="business-form">
      <div className="container form-card-container">
        <div className="form-elevated-card">
          {/* Form Header */}
          <div className="form-header-area">
            <h2 className="form-section-heading">
              {currentLang === 'hi'
                ? 'अपने व्यवसाय के बारे में बताएं'
                : 'Tell Us About Your Business'}
            </h2>
            <p className="form-section-subtitle">
              {currentLang === 'hi'
                ? 'कुछ बुनियादी विवरण भरें और अर्थसेतु को आपके स्थानीय अवसर का विश्लेषण करने दें।'
                : 'Provide a few details and let ArthSetu analyze your business opportunity.'}
            </p>
          </div>

          {/* Business Analysis Form */}
          <form onSubmit={handleSubmit} noValidate className="business-form">
            {/* Field A: Geographic Location */}
            <div className="form-group">
              <label htmlFor="form-location" className="form-label">
                <span>
                  {currentLang === 'hi' ? 'भौगोलिक स्थान (Location)' : 'Geographic Location'}
                  <span className="label-required">*</span>
                </span>
              </label>

              <div className="input-container">
                <span className="input-icon-left" aria-hidden="true">
                  <MapPin size={20} />
                </span>
                <select
                  id="form-location"
                  name="location"
                  className={`form-select has-left-icon ${errors.location ? 'input-error' : ''}`}
                  value={formData.location}
                  onChange={handleChange}
                  aria-invalid={errors.location ? 'true' : 'false'}
                  aria-describedby={errors.location ? 'location-error' : undefined}
                >
                  <option value="">
                    {currentLang === 'hi' ? '-- जिला चुनें --' : '-- Select Target District --'}
                  </option>
                  {DISTRICT_NAMES.map((dist) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
                </select>
                <span className="select-arrow" aria-hidden="true">
                  <ChevronDown size={18} />
                </span>
              </div>

              {errors.location && (
                <p className="form-error-text" id="location-error" role="alert">
                  <AlertCircle size={14} />
                  <span>{errors.location}</span>
                </p>
              )}
            </div>

            {/* Field B: Available Margin Capital */}
            <div className="form-group">
              <label htmlFor="form-capital" className="form-label">
                <span>
                  {currentLang === 'hi' ? 'उपलब्ध स्वयं की पूंजी' : 'Available Margin Capital'}
                  <span className="label-required">*</span>
                </span>
              </label>

              <div className="input-container">
                <span className="input-prefix" aria-hidden="true">₹</span>
                <input
                  id="form-capital"
                  name="capital"
                  type="number"
                  min="0"
                  step="1000"
                  className={`form-input has-prefix ${errors.capital ? 'input-error' : ''}`}
                  placeholder={currentLang === 'hi' ? 'उदा. 100000' : 'e.g. 100000'}
                  value={formData.capital}
                  onChange={handleChange}
                  aria-invalid={errors.capital ? 'true' : 'false'}
                  aria-describedby="capital-helper"
                />
              </div>

              <p className="form-helper-text" id="capital-helper">
                {currentLang === 'hi'
                  ? 'यह वह राशि है जो आप अपने व्यवसाय में स्वयं निवेश कर सकते हैं।'
                  : 'This is the amount you can contribute towards your business.'}
              </p>

              {errors.capital && (
                <p className="form-error-text" role="alert">
                  <AlertCircle size={14} />
                  <span>{errors.capital}</span>
                </p>
              )}

              {/* 4. SMART PREVIEW SECTION */}
              <div className="smart-preview-card" aria-live="polite">
                <div className="smart-preview-content">
                  <Info size={20} className="smart-preview-icon" />
                  <div className="smart-preview-text">
                    <h3 className="smart-preview-title">
                      {currentLang === 'hi' ? 'स्मार्ट पूंजी अवलोकन' : 'Margin Capital Guideline'}
                    </h3>
                    <p className="smart-preview-description">
                      {currentLang === 'hi'
                        ? 'आपकी उपलब्ध पूंजी को लगभग 10% मार्जिन योगदान माना जाता है।'
                        : 'Your available capital is considered as approximately 10% margin contribution.'}
                    </p>
                    {parsedCapital > 0 && (
                      <div className="smart-preview-calculation">
                        <span>
                          {currentLang === 'hi'
                            ? `अनुमानित कुल परियोजना लागत क्षमता: ₹${formatIndianCurrency(estimatedProjectCost)}`
                            : `Estimated Feasible Project Cost: ~ ₹${formatIndianCurrency(estimatedProjectCost)}`}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Field C: Proposed Business Category */}
            <div className="form-group">
              <label htmlFor="form-category" className="form-label">
                <span>
                  {currentLang === 'hi' ? 'प्रस्तावित व्यवसाय श्रेणी' : 'Proposed Business Category'}
                  <span className="label-required">*</span>
                </span>
              </label>

              <div className="input-container">
                <select
                  id="form-category"
                  name="category"
                  className={`form-select ${errors.category ? 'input-error' : ''}`}
                  value={formData.category}
                  onChange={handleChange}
                  aria-invalid={errors.category ? 'true' : 'false'}
                  aria-describedby={errors.category ? 'category-error' : undefined}
                >
                  <option value="">
                    {currentLang === 'hi' ? '-- श्रेणी का चयन करें --' : '-- Select Business Category --'}
                  </option>
                  {availableCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <span className="select-arrow" aria-hidden="true">
                  <ChevronDown size={18} />
                </span>
              </div>

              {errors.category && (
                <p className="form-error-text" id="category-error" role="alert">
                  <AlertCircle size={14} />
                  <span>{errors.category}</span>
                </p>
              )}
            </div>

            {/* Field D: Optional Business Description */}
            <div className="form-group">
              <label htmlFor="form-description" className="form-label">
                <span>
                  {currentLang === 'hi' ? 'व्यवसाय विवरण' : 'Business Description'}
                </span>
                <span className="label-optional">
                  {currentLang === 'hi' ? '(वैकल्पिक)' : '(Optional)'}
                </span>
              </label>

              <textarea
                id="form-description"
                name="description"
                rows={3}
                className="form-textarea"
                placeholder={
                  currentLang === 'hi'
                    ? 'अपने व्यावसायिक विचार के बारे में संक्षेप में बताएं'
                    : 'Tell us briefly about your business idea'
                }
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            {/* 5. PRIMARY CTA */}
            <Button
              id="analyze-business-button"
              type="submit"
              variant="primary"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              loading={isSubmitting}
            >
              {currentLang === 'hi' ? 'मेरे व्यवसाय का विश्लेषण करें' : 'Analyze My Business'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
