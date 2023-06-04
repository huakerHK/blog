const { Router } = require('express')
const router = Router()

const article = require('../../Controller/article')

router.get('/articles',article.articles)
router.get('/detail',article.detail)
router.post('/add',article.add)

module.exports = router