// loading spinner

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById('loader');
  if (isLoading) {
    loadingSpinner.classList.remove('hidden');
  } else {
    setTimeout(() => {
      loadingSpinner.classList.add('hidden');
    }, 2000);
  }
};

const loadDiscussData = (category = '') => {
  toggleLoadingSpinner(true)
  fetch(`https://openapi.programming-hero.com/api/retro-forum/posts${category ? `?category=${category}` : ''}`)
    .then(res => res.json())
    .then((data) => {
      const cardContainer = document.getElementById('card-container')
      cardContainer.textContent = ''
      
        data.posts.map(post => {
            // console.log(post)
           
            const div = document.createElement('div')
            div.classList.add('mt-5','bg-[#F3F3F5]','card', 'card-side', 'bg-base-100', 'shadow-xl');
            div.innerHTML = `
            
            <div>
            ${post.isActive === true ? 
            '<div class="avatar online placeholder">'+
            '<div class="bg-neutral text-neutral-content rounded-xl w-16">'+
            `<img src='${post?.image}'/>`+
            '</div>'+
            '</div> '
            
            :
            '<div class="avatar offline placeholder">'+
            '<div class="bg-neutral text-neutral-content rounded-xl w-16">'+
            `<img src='${post?.image}'/>`+
            '</div>'+
            '</div>' 
           
            
        } 
           </div>
               <div class="card-body">
                      <div class='flex'>
                        <p># ${post?.category}</p>
                        <p>Author: ${post?.author?.name}</p>
                      </div>
                      <h2 class="card-title">${post?.title}</h2>
                      <p>${post?.description}</p>
                      <div class=" border-t border-dotted border-base-300"></div>
                      <div class='flex justify-between items-center'>
                        <div class='flex justify-evenly'>
                    	    <div class='flex justify-center items-center'>
                          <i class="fa-regular fa-comment-dots"></i>
                          <p class='ms-1'>${post?.comment_count}</p>
                          </div>
                    	    <div class='ms-3 flex justify-center items-center'>
                          <i class="fa-regular fa-eye"></i>
                          <p class='ms-1'>${post?.view_count}</p>
                          </div>
                    	    <div class='ms-3 flex justify-center items-center'>
                          <i class="fa-regular fa-clock"></i>
                          <p class='ms-1'>${post?.posted_time} min</p>
                          </div>
                        </div>

                        <div class="card-actions justify-end">
                        <button onClick="handleGetPostData('${post?.title.replace(/'/g, '')}', ${post?.view_count})" class="btn bg-[#10B981] text-white rounded-full"><i class="fa-regular fa-envelope-open"></i></button>
                      </div>
                      </div>
                    </div>
            
            `
            cardContainer.appendChild(div)
            
        })
        
        
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    })
    .finally(() => {
      toggleLoadingSpinner(false);
    });
}
let count = 0
const handleGetPostData = (title, view) => {
 
  const container = document.getElementById('container')
  const div = document.createElement('div');
  count++
  const counter = document.getElementById('count-message')
  counter.innerText = `${count}`
  div.classList.add('ms-4','w-[300px]','md:w-[415px]','flex','mb-3','bg-white','p-3', 'rounded-lg','justify-center','items-center')
  div.innerHTML = `
    <h1 class="text-[15px] font-[800] md:me-28">${title}</h1>
    <div class=' flex justify-between'>
      <i class="fa-regular fa-eye"></i>
      <p class='ms-1 text-[16px]'>${view}</p>
    </div>
  `;
  container.appendChild(div)
};

document.getElementById('searchBtn').addEventListener('click', (e)=> {
  toggleLoadingSpinner(true);
  e.preventDefault();
  let searchFiled = document.getElementById('input-filed').value
  loadDiscussData(searchFiled)
})

// load latest data

const loadLatestData = () => {
  fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`)
  .then(res => res.json())
  .then(data => displayLatestData(data))
}
const displayLatestData= (news) => {
  const newsContainer = document.getElementById('newsContainer')
  news.map(newsItem => {
    const div = document.createElement('div')
    div.classList.add('card', 'card-compact', 'w-96', 'bg-base-100', 'shadow-xl')
    div.innerHTML = `
    <figure><img src="${newsItem.cover_image}" alt="Shoes" /></figure>
          <div class="card-body">
          <p class='text-[#12132D99]'><i class="fa-regular fa-calendar me-1"></i>${newsItem?.author?.posted_date || 'No publish date' }</p>
            <h2 class="card-title text-[#12132D]">${newsItem.title}</h2>
            <p>${newsItem.description}</p>
            <div class="card-actions flex justify-start">
            <div class="avatar">
            <div class="rounded-full w-12">
              <img src="${newsItem?.profile_image}" />
            </div>
          </div>
          <div>
            <p class='font-bold'>${newsItem.author.name}</p>
            <p>${newsItem.author?.designation || 'Unknown'}</p>
          </div>
            </div>
          </div>
    `
    newsContainer.appendChild(div)
  })
}




loadDiscussData()
loadLatestData()
