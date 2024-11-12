const output = document.querySelector('#output')
const button = document.querySelector('#get-posts-btn')

// get and show the posts
async function showPosts() {
    try {
        const res = await fetch('http://localhost:8000/api/posts')
        if(!res.ok) {
            throw new Error('failed to fetch posts')
        }
        const posts = await res.json()
        output.innerHTML = ''

        posts.forEach((post) => {
        const postElement = document.createElement('div')
        postElement.textContent = post.title
        output.appendChild(postElement) 
    })
    } catch (error) {
        console.error('Error fetching the posts: ', error)
    }
}

// submit new post
const form = document.querySelector('#add-post-form')
form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const title = form.title.value
    try {
        const res = await fetch('http://localhost:8000/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title }),
        })
        if (!res.ok) {
            throw new Error('Failed to add post')
        }
        const post = await res.json()
        console.log(post)
        form.title.value = ''
        showPosts()
    } catch (error) {
        console.error('Error adding post: ', error)
    }
})

button.addEventListener('click', showPosts)
