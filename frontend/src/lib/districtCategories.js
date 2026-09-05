/**
 * Shared Single Source of Truth for District Business Categories
 * Maps each supported district to its available verified business categories
 * as sourced from OpenStreetMap density data in backend/app/data_layer/district_data.json.
 */

export const DISTRICT_CATEGORIES = {
  Ghaziabad: ['Retail', 'Textiles', 'Dairy', 'Food Processing'],
  Meerut: ['Retail', 'Dairy', 'Food Processing'],
  Prayagraj: ['Retail', 'Textiles', 'Dairy', 'Food Processing'],
  Varanasi: ['Retail', 'Dairy', 'Food Processing'],
};

export const DISTRICT_NAMES = Object.keys(DISTRICT_CATEGORIES);
