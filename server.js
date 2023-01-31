const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('api.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})

router.render = (req, res) => {
    let code = res.statusCode
    switch (code) {
        case 200:
            res.jsonp({
                code: 0,
                data: res.locals.data
            })
            break;
        default:
            res.jsonp({
                code: 1,
                data: "El dato solicitido no existe"
            })
            break;
    }
}

// Export the Server API
module.exports = server