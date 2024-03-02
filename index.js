

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

            (
            <div class="avatar online placeholder">
            <div class="bg-neutral text-neutral-content rounded-full w-16">
            <img src='${post.image}'/>
            </div>
            </div> 
            )
            :
           (
            <div class="avatar offline placeholder">
            <div class="bg-neutral text-neutral-content rounded-full w-16">
            <img src='${post.image}'/>
            </div>
            </div> 
           )
            
        }
            
            </div>

                    <div class="card-body">
                      <h2 class="card-title">New movie is released!</h2>
                      <p>Click the button to watch on Jetflix app.</p>
                      <div class="card-actions justify-end">
                        <button class="btn btn-primary">Watch</button>
                      </div>
                    </div>
            
            `
            cardContainer.appendChild(div)
        })
    })
}

loadDiscussData()