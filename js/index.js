// =================news category ================\
const loadAllNewsCategories = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories')
    const data = await response.json();
    return displayNewsCategory(data.data.news_category);
}

loadAllNewsCategories();

const displayNewsCategory = (newsCategories) => {
    const categoriesContainer = document.getElementById('categories-container');
    newsCategories.forEach(newsCategory => {
        const ul = document.createElement('ul');
        
        ul.innerHTML = `
            <a class="text-decoration-none text-black fw-semibold" href=""> ${newsCategory.category_name} </a>
                    
        `;

        categoriesContainer.appendChild(ul);
    })
}
