let fetchData =[];

const fetchCategories = () =>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => showCategories(data.data))
}
// fetchCatagories();
const showCategories = data =>{
//  console.log(data);
// capture catagories container to append the all catagories links
const categoriesContainer = document.getElementById('categories-container');
data.news_category.forEach(singleCategory => {
  /*   console.log(singleCategory)

    categoriesContainer.innerHTML +=`
    <a class="nav-link" href="#">${singleCategory.category_name}</a>

    `; */

    const linkContainer = document.createElement('p');
    linkContainer.innerHTML = `
    <a class="nav-link" href="#" onclick = "fetchCategoryNews('${singleCategory.category_id}','${singleCategory.category_name}')"> ${singleCategory.category_name}</a>
    `;
    categoriesContainer.appendChild(linkContainer);
});
}
//fetch all news available in the category

const fetchCategoryNews = (category_id, category_name) => {
    // console.log(category_id);
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    
    fetch(url)
    .then(res => res.json())
    
    .then ( (data) =>{fetchData = (data.data);
      showAllNews(data.data,category_name)
    }) ;
};

const showAllNews  = (data, category_name) => {
  console.log(data.length, category_name);
  document.getElementById('news-count').innerText = data.length;
  document.getElementById('news-title').innerText = category_name;
  const newsContainer = document.getElementById('all-news');
  newsContainer.innerHTML = "";
  data.forEach(singleNews => {
     const {_id,image_url,title,details,author,total_view,rating} = singleNews;
   /*  newContainer.innerHTML += `
    <div class="card mb-3">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="..." class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
      </div>
    </div>
  </div>
    `; */

    const card = document.createElement('div');
    card.classList.add("card","mb-3");
    card.innerHTML= `
    <div class="row g-0">
      <div class="col-md-4">
        <img src=${image_url} class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8 d-flex flex-column ">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">${details.slice(0,200)}...</p>
        </div>

        <div class ="card-footer border-0 bg-body d-flex justify-content-between ">
        <div class="d-flex gap-2">
        <img src=${author.img} class="img-fluid rounded-circle" alt="..." height ="40" width="40">
        <div>
        <p class ="m-0 p-0">${author.name ? author.name : "Not available" } </p>
        <p class ="m-0 p-0">${author.published_date} </p>
        </div>
       
        </div>


        <div class ="d-flex align-items-centre">
        <i class=" fas fa-eye"></i>
        <p class ="m-0 p-0">${total_view ? total_view : "Not available"} </p>
        </div>

        <div class ="d-flex gap-2">
        <i class=" fas fa-star"></i>
        <i class=" fas fa-star"></i>
        <i class=" fas fa-star"></i>
        <i class=" fas fa-star"></i>
        <i class=" fas fa-star-half"></i>
        <p>${rating.number}</p>

        </div>

        <div>
        <i class=" fas fa-arrow-right" onclick ="fetchNewsDetails('${_id}')" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>

        </div>

        </div>
      </div>
     
    </div>

    `;
    newsContainer.appendChild(card);
  })
}

const fetchNewsDetails =news_id =>{
  let url = `https://openapi.programming-hero.com/api/news/${news_id}`;
  console.log(url);
  fetch(url)
  .then(res => res.json())
  .then(data => showNewsDetails(data.data[0]))
}
const showNewsDetails = (newsDetails) =>{
  const {_id,image_url,title,details,author,total_view,others_info} = newsDetails;
  
  document.getElementById('modal-body').innerHTML= `
  <div class="card mb-3">
  <div class="row g-0">
      <div class="col-md-12">
        <img src=${image_url} class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-12 d-flex flex-column ">
        <div class="card-body">
          <h5 class="card-title">${title} <span class="badge text-bg-warning">${others_info.is_trending ?"Trending" : ""}</span></h5>
          <p class="card-text">${details}</p>
        </div>

        <div class ="card-footer border-0 bg-body d-flex justify-content-between ">
        <div class="d-flex gap-2">
        <img src=${author.img} class="img-fluid rounded-circle" alt="..." height ="40" width="40">
        <div>
        <p class ="m-0 p-0">${author.name ? author.name : "Not available" } </p>
        <p class ="m-0 p-0">${author.published_date} </p>
        </div>
       
        </div>


        <div class ="d-flex align-items-centre">
        <i class=" fas fa-eye"></i>
        <p class ="m-0 p-0">${total_view ? total_view : "Not available" } </p>
        </div>

        <div>
        <i class=" fas fa-star"></i>

        </div>

        

        </div>
      </div>
     
    </div>

    `;

    
}; 
/*? ternary operator - short curt if else  
condition ? "execute for true" : "execute for false"

*/

// show trending news 
const showTrending =()=>{
  const trendingNews = fetchData.filter(singleData => singleData.others_info.is_trending === true);
  const category_name = document.getElementById("news-title").innerText;
 
 showAllNews(trendingNews,category_name );
};
const showTodaysPick=()=>{
  const todaysPickNews = fetchData.filter(singleData => singleData.others_info.is_todays_pick === true);
  const category_name = document.getElementById("news-title").innerText;
 
 showAllNews(todaysPickNews, category_name);
};

// optional
// Generate stars
// ${generateStars(rating.number)}
// const generateStars= rating =>{
//     let ratingHTML= '';
//     for (let i = 1; i <= Math.floor(rating); i++){
//         ratingHTML +=`<i class="fas fa-star"></i>`;
      
//     }
//     if(rating - Math.floor(rating)>0){
//         ratingHTML+=`<i class="fas fa-star-half"></i>`
//     }
//     return ratingHTML
// }