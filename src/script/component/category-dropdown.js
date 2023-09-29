class CategoryDropdown extends HTMLElement {
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.fetchCategories();
    }

    async fetchCategories() {
        try {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
            const data = await response.json();
            const categories = data.categories;

            this.render(categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }

    async fetchMealsByCategory(category) {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
            const data = await response.json();
            return data.meals;
        } catch (error) {
            console.error('Error fetching meals by category:', error);
            return [];
        }
    }

    async renderCategoryMeals(category) {
        const meals = await this.fetchMealsByCategory(category);
        const categoryInfo = this.shadowDOM.querySelector('#categoryInfo');

        if (meals.length > 0) {
            const mealList = meals.map(meal => `<li>${meal.strMeal}</li>`).join('');
            categoryInfo.innerHTML = `
            <div class="category-card">
                <div class="category-info">
                    <img src="${this.currentCategory.strCategoryThumb}" alt="${this.currentCategory.strCategory}">
                    <h2>${this.currentCategory.strCategory}</h2>
                    <p>${this.currentCategory.strCategoryDescription}</p>
                </div>
                <h2>${category} menu:</h2>
                <ul>${mealList}</ul>
            </div>
            `;
        } else {
            categoryInfo.innerHTML = '';
        }
    }

    render(categories) {
        this.shadowDOM.innerHTML = `
        <style>
            .search-container {
                max-width: 1000px;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                padding: 16px;
                border-radius: 5px;
                display: flex;
                flex-direction: column;
                top: 10px;
                margin: 0 auto;
            }

            select {
                width: 100%;
                padding: 16px;
                border: 0;
                border-bottom: 1px solid cornflowerblue;
                font-weight: bold;
                margin-bottom: 5px;
            }

            .category-card {
                border-radius: 5px;
                padding: 16px;
                margin-bottom: 8px;
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .category-info {
                text-align: center;
                margin-bottom: 8px;
            }

            img {
                width: 50%;
                margin-bottom: 5px;
            }

            ul {
                list-style-type: none;
                padding: 0;
            }
        </style>
        <div class="search-container">
            <select id="categorySelect">
                <option value="" disabled selected>Select Category</option>
                ${categories.map(category => `<option value="${category.strCategory}">${category.strCategory}</option>`)}
            </select>
            <div id="categoryInfo"></div>
        </div>
        `;

        const categorySelect = this.shadowDOM.querySelector('#categorySelect');
        categorySelect.addEventListener('change', () => {
            const selectedCategory = categorySelect.value;
            this.currentCategory = categories.find(category => category.strCategory === selectedCategory);
            this.renderCategoryMeals(selectedCategory);
        });
    }
}

customElements.define('category-dropdown', CategoryDropdown);
