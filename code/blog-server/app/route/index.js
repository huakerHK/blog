const article = require('./article')
const user = require('./user')
const sys = require('./sys')
// const root = require('./root')
// const chartGPT = require('./openai')
const file = require('./file')
const preject = require('./preject')
const demand = require('./demand')
const easyHouse = require('./easyHouse')
const pastBooks = require('./pastBooks')
const jianli = require('./jianli')

const { authenticateToken } = require('../../middleware')

module.exports = (app) => {
  app.post('/api/post/*', authenticateToken)
  app.post('/api/pastBooks/*', authenticateToken)
  app.post('/api/demand/*', authenticateToken)
  // app.post('/api/user/*', authenticateToken)
  // app.get('/api/jianli/download', authenticateToken)
  app.get('/api/user/info', authenticateToken)

  app.use('/api/post', article)
  app.use('/api/user', user)
  // app.use('/api/user', root)
  app.use('/api/sys', sys)
  // app.use('/api/open-ai', chartGPT)
  app.use('/api/file', file)
  app.use('/api/preject', preject)
  app.use('/api/demand', demand)
  app.use('/api/easyHouse', easyHouse)
  app.use('/api/pastBooks', pastBooks)
  app.use('/api/jianli', jianli)
}
