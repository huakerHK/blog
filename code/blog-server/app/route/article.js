const _ = require('lodash')
const { Router } = require('express')
const router = Router()
const posts = require('../models/post')
// const article = require('../controller/article')
const Middleware = require('../middleware/index')
const moment = require('moment')

// 65feac185b722ffab4dc8d5f
/**
 * @swagger
 * tags:
 *  - name: Post
 *    description: 文章
 *
 * components:
 *    schemas:
 *       Post:
 *          type: object
 *          properties:
 *              title:
 *                  in: title
 *                  description: '文章标题'
 *              date:
 *                  in: date
 *                  description: '时间'
 *              body:
 *                  in: body
 *                  description: '内容'
 *              userId:
 *                  in: userId
 *                  description: '用户id'
 */

/**
 * @swagger
 * /api/post/list:
 *  get:
 *      summary: 文章列表
 *      tags: [Post]
 *      parameters: []
 *      responses:
 *          200:
 *             description: 成功
 *
 */
router.get('/list', async (req, res, next) => {
  try {
    let result = await posts.find({}).sort({ date: -1 })
    res.send({
      data: result,
      status: 200,
    })
  } catch (error) {
    next(error)
  }
})
/**
 * @swagger
 * /api/post/detail:
 *  get:
 *      summary: 文章详情
 *      tags: [Post]
 *      parameters:
 *          - name: _id
 *            in: _id
 *            description: '文章ID'
 *      responses:
 *          200:
 *             description: 成功
 *
 */
router.get('/detail', async (req, res, next) => {
  console.log(req.params)
  console.log(req.query)
  let { _id } = _.assign(req.body, req.query, req.params)
  try {
    let result = await posts.findOne({ _id: _id })
    res.send({
      data: result,
      status: 200,
    })
  } catch (error) {
    next(error)
  }
})
//   security: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmVhYzE4NWI3MjJmZmFiNGRjOGQ1ZiIsInVzZXJuYW1lIjoidGVzdCIsInBhc3N3b3JkIjoiJDJhJDEwJHVjUS9lM1gzd3NDRElBZ1FqVmFuSS53OEg3SExXSVZDNFBxeU4uYm9FeEVmVFlveDZiN3MuIiwiaWF0IjoxNzExMTg5NDI2fQ.CHKgUDuup4YPcCOvVT_-HpogWbPt2PPe3auomNxW9V8'

/**
 * @swagger
 * /api/post/create:
 *  post:
 *      summary: 新增文章
 *      tags: [Post]
 *      security:
 *        - basicAuth: []
 *      requestBody:
 *        description: "Created post object"
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Post'
 *      responses:
 *          200:
 *             description: 成功
 *
 */
router.post('/create', async (req, res, next) => {
  try {
    const { title, body, userId } = req.body
    const date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    const result = await posts.insertMany({
      date: date,
      title: title,
      body: body,
      userId: userId,
    })
    if (result) {
      res.send({
        type: 'success',
        status: 200,
        msg: '文章添加成功了',
      })
      next()
    }
  } catch (error) {}
})

module.exports = router
