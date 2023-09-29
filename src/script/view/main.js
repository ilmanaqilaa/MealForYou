// Pada main.js
import '../component/meal-list.js';
import '../component/category-dropdown.js';
import DataSource from '../data/api.js';


const main = () => {
  const searchElement = document.querySelector('app-bar');
  const mealListElement = document.querySelector('meal-list');

  const onInputSearch = async (query) => {
    try {
      const result = await DataSource.searchMeal(query);
      renderResult(result);
    } catch (message) {
      fallbackResult(message);
    }
  };

  const renderResult = (results) => {
    mealListElement.meals = results;
  };

  const fallbackResult = (message) => {
    mealListElement.renderError(message);
  };

  searchElement.clickEvent = onInputSearch;
};

export default main;