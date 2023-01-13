const express = require('express')
// const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
// const { log } = require('../../middlewares/logger.middleware')
const { getToys, getToyById, addToy, updateToy, removeToy ,  } = require('./toy.controller')
const router = express.Router()
//TODO:addToyMsg,removeToyMsg
// middleware that is specific to this router
// router.use(requireAuth)

// router.get('/', log, getToys)
router.get('/', getToys)
router.get('/:id', getToyById)
// router.post('/', requireAuth, addToy)
router.post('/', addToy)
// router.put('/:id', requireAuth, updateToy)
router.put('/:id', updateToy)
// router.delete('/:id', requireAuth, removeToy)
router.delete('/:id', removeToy)
// router.delete('/:id', requireAuth, requireAdmin, removeToy)

// router.post('/:id/msg', requireAuth, addCarMsg)
// router.delete('/:id/msg/:msgId', requireAuth, removeCarMsg)

module.exports = router