

const loadDiscussData = () => {
    fetch('https://openapi.programming-hero.com/api/retro-forum/posts')
    .then(res => res.json())
    .then((data) => {
        data.posts.map(post => {
            console.log(post)
            const cardContainer = document.getElementById('card-container')
            const div = document.createElement('div')
            div.classList.add('card', 'card-side', 'bg-base-100', 'shadow-xl');
            div.innerHTML = `
            
            <div>
            ${post.isActive === true ? 
            '<div class="avatar online placeholder">'+
            '<div class="bg-neutral text-neutral-content rounded-full w-16">'+
            `<img src='${post?.image}'/>`+
            '</div>'+
            '</div> '
            
            :
            '<div class="avatar offline placeholder">'+
            '<div class="bg-neutral text-neutral-content rounded-full w-16">'+
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
                        <button class="btn bg-[#10B981] text-white rounded-full"><i class="fa-regular fa-envelope-open"></i></button>
                      </div>
                      </div>
                    </div>
            
            `
            cardContainer.appendChild(div)
        })
    })
}

loadDiscussData()