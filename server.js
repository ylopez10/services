const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('api.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
server.listen(5000, () => {
    console.log('JSON Server is running')
})

router.stack = router.stack.filter(item => item.handle.length !== 4)

router.use((err, req, res, next) => {
  let status = 500;
  if (err.message === 'Insert failed, duplicate id') {
    status = 409
  }

  res.status(status).send({
    code: 1,
    message: 'Error en el registro, el id esta duplicado.'
  })
})

router.render = (req, res) => {
  let code = res.statusCode
  switch (code) {
    case 200:
    case 201:
      if (res.locals.data.length == 0) {
        res.jsonp({
          code: 1,
          data: []
        })
      } else {
        res.jsonp({
          code: 0,
          data: res.locals.data
        })
      }
      break;
    default:
      res.jsonp({
        code: 1,
        message: 'El servicio solicitado no existe'
      })
      break;
  }
}

// Export the Server API
module.exports = server