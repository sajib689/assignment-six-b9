

const loadDiscussData = () => {
    fetch('https://openapi.programming-hero.com/api/retro-forum/posts')
    .then(res => res.json())
    .then(data => console.log(data))
}