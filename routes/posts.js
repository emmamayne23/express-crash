import express from 'express'
const router = express.Router()

let posts = [
    {id: 1, title: 'Post One'},
    {id: 2, title: 'Post Two'},
    {id: 3, title: 'Post Three'},
    {id: 4, title: 'Post Four'},
    {id: 5, title: 'Post Five'},
    {id: 6, title: 'Post Six'},
]

// get all posts
router.get('/', (req, res) => {
    const limit = parseInt(req.query.limit)

    if (!isNaN(limit) && limit > 0) {
        res.status(200).json(posts.slice(0, limit))
    } else {
        res.status(200).json(posts)
    }
})

// get just a single post
router.get('/:id', (req, res, next) => {
    const id = parseInt(req.params.id)
    // res.status(200).json(posts.filter((post) => post.id === id))
    const post  = posts.find(post => post.id === id)

    if (!post) {
        // res.status(404).json({ msg: `Post with id:${id} cannot be found` })
        const err =  new Error(`Post with id:${id} cannot be found`)
        err.status = 404
        next(err)
    } else {
        res.status(200).json(post)
    }

})

// create a new post
router.post('/', (req, res) => {
    // console.log(req.body)
    const newPost = {
        id: posts.length + 1,
        title: req.body.title
    }

    if(!newPost.title) {
        return res.status(400).json({ msg: 'Please include a title' })
    }

    posts.push(newPost)
    res.status(201).json(posts)
})

// update a post
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const post = posts.find(post => post.id === id)

    if (!post) {
        return res.status(404).json({ msg: `Post with id:${id} cannot be found` })
    }

    post.title= req.body.title
    res.status(200).json(posts)
})

// delete the post
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const post = posts.find(post => post.id === id)

    if (!post) {
        return res.status(404).json({ msg: `Post with id:${id} cannot be found` })
    }

    posts = posts.filter(post => post.id !== id)
    res.status(200).json(posts)
})

export default router