const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('api.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
// Add this before server.use(router)
server.use(jsonServer.rewriter({
    '/api/cards': '/cards',
    "/cards/name/:name": "/cards?name_like=:name"
}))
server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})

// Export the Server API
module.exports = server