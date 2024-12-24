import { createServer } from 'http'
const PORT = process.env.PORT

const users = [
    { id: 1, name: 'John', number: 3242},
    { id: 2, name: 'Anabelle', number: 9574},
    { id: 3, name: 'Joseph', number:3352},
    { id: 4, name: 'Prince', number:9146},
    { id: 5, name: 'Johnathan', number:6452},
    { id: 6, name: 'Jane', number: 9703},
]

// Logger middleware
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  };
  
  // JSON middleware
  const jsonMiddleware = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
  };
  
  // Route handler for GET /api/users
  const getUsersHandler = (req, res) => {
    res.write(JSON.stringify(users));
    res.end();
  };
  
  // Route handler for GET /api/users/:id
  const getUserByIdHandler = (req, res) => {
    const id = req.url.split('/')[3];
    const user = users.find((user) => user.id === parseInt(id));
  
    if (user) {
      res.write(JSON.stringify(user));
    } else {
      res.statusCode = 404;
      res.write(JSON.stringify({ message: 'User not found' }));
    }
    res.end();
  };

  // route handler for post request
  const createUserHandler = (req, res) => {
    let body = ''
    // listen for the data
    req.on('data', (chunk) => {
      body += chunk.toString()
    })
    req.on('end', () => {
      const newUser = JSON.parse(body);
      users.push(newUser);
      res.statusCode = 201
      res.write(JSON.stringify(newUser));
      res.end
    })
  }
  
  // Not found handler
  const notFoundHandler = (req, res) => {
    res.statusCode = 404;
    res.write(JSON.stringify({ message: 'Route not found' }));
    res.end();
  };
  
  const server = createServer((req, res) => {
    logger(req, res, () => {
      jsonMiddleware(req, res, () => {
        if (req.url === '/api/users' && req.method === 'GET') {
          getUsersHandler(req, res);
        } else if (
          req.url.match(/\/api\/users\/([0-9]+)/) &&
          req.method === 'GET'
        ) {
          getUserByIdHandler(req, res);
        } else if (req.url === '/api/users' && req.method === 'POST') {
          createUserHandler(req, res);
        } else {
          notFoundHandler(req, res);
        }
      });
    });
  });

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})