// =================news category ================\
const loadAllNewsCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try {
        const response = await fetch(url)
        const data = await response.json();
        displayNewsCategory(data.data.news_category);
    }
    catch (error) {
        console.log(error)
    }
}

loadAllNewsCategories();

const displayNewsCategory = (newsCategories) => {
    const categoriesContainer = document.getElementById('categories-container');
    newsCategories.forEach(newsCategory => {
        const ul = document.createElement('ul');
        console.log(newsCategory)
        ul.classList.add('p-0')
        ul.innerHTML = `
            <p onclick="loadCategoryNews('${newsCategory.category_id}')" class="text-decoration-none m-0 text-black px-1 fw-semibold" style="cursor: pointer;"> ${newsCategory.category_name} </p>
                    
        `;

        categoriesContainer.appendChild(ul);
    })
}

// ================news section =================

const loadCategoryNews = async (category_id) => {
    console.log(category_id)
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    try {
        const response = await fetch(url)
        const data = await response.json();
        displayNewsByCategory(data.data);
    }
    catch (error) {
        console.log(error)
    }
}

const displayNewsByCategory = (allNews) => {
    // console.log(allNews);
    toggleSpinner(false)
    document.getElementById('found-items').innerText = allNews.length;
    const newsItems = document.getElementById('news-items');
    newsItems.innerHTML = '';
    allNews.forEach(newsItem => {
        const div = document.createElement('div');
        // div.classList.add('p-0')
        div.innerHTML = `

        <div class="card mb-3 rounded-4">
            <div class="d-md-flex align-items-center g-0 p-3">
                <div class="">
                <img src="${newsItem.thumbnail_url}" alt="...">
                </div>
             <div class="">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${newsItem.title}</h5>

                    <p class="card-text my-4">${newsItem.details.slice(0, 500)+('...')}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex gap-2">
                            <img width="50" height="50" class="rounded-circle"
                                src="${newsItem.author.img}"
                                alt="">
                            <div>
                                <p class="m-0 fw-semibold">${newsItem.author.name}</p>
                                <p class="m-0"><small>${newsItem.author.published_date}</small></p>
                            </div>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="25">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              

                            <span class="fw-semibold">${newsItem.total_view}</span>
                        </div>
                        <div>
                            <button onclick="loadNews('${newsItem._id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Details
                            </button>

                            <!-- Modal -->

                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-xl">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">News Details</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                    <div id="modal-details" class="modal-body">
                                    
                                    </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" class="btn btn-primary">Save changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
                    
        `;

        newsItems.appendChild(div);
    });
    
}


const toggleSpinner = isLoading=> {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none')
    }
}

// =====================modal section =====================

const loadNews = async (_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${_id}`;
    try {
        const response = await fetch(url)
        const data = await response.json();
        displayNews(data.data);

    }
    catch (error) {
        console.log(error)
    }
}
const displayNews = (news) => {
    const exampleModal = document.getElementById('exampleModal');
    exampleModal.innerHTML ='';
    news.forEach(modal => {
        const div = document.createElement('div');
        div.innerHTML = `
        <!-- <div class="card mb-3 rounded-4">
        <div class="d-md-flex align-items-center g-0 p-3">
            <div class="">
                <img src="${modal.thumbnail_url}" alt="...">
            </div>
            <div class="">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${modal.title}</h5>

                    <p class="card-text my-4">${modal.details}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex gap-2">
                            <img width="50" height="50" class="rounded-circle" src="${modal.author.img}" alt="">
                            <div>
                                <p class="m-0 fw-semibold">${modal.author.name}</p>
                                <p class="m-0"><small>${modal.author.published_date}</small></p>
                            </div>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" width="25">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>


                            <span class="fw-semibold">${modal.total_view}</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div> -->
        `;
        exampleModal.appendChild(div);
    })
}