import http from 'http'
const PORT = process.env.PORt

const server = http.createServer((req, res) => {
    // res.write('Hello world of node.js!!!')
    
    console.log(req.url)
    console.log(req.method)

    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end('<h1>Oh, hello world!</h1>')

    // res.end(JSON.stringify({ message: 'Hello world of node.js !!!' }))
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

// const server = createServer((req, res) => {
//     logger(req, res, () => {
//         if(req.url === '/api/users' && req.method === 'GET') {
//             res.setHeader('Content-Type', 'application/json');
//             res.write(JSON.stringify(users))
//             res.end()
//         } else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET') {
//             const id = req.url.split('/')[3]
//             const user = users.find(user => user.id === parseInt(id))
    
//             if (user) {
//                 res.setHeader('Content-Type', 'application/json');
//                 res.write(JSON.stringify(user))
//                 res.end()
//             } else {
//                 res.setHeader('Content-Type', 'application/json');
//                 res.statusCode = 404
//                 res.write(JSON.stringify({ message: 'User not found' }))
//                 res.end()
//             }
//         } else {
//             res.setHeader('Content-Type', 'application/json');
//             res.statusCode = 404
//             res.write(JSON.stringify({ message: 'Route not found' }))
//             res.end()
//         }
//     })
        
//     })