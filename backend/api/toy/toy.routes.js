const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getToys, getToyById, addToy, updateToy, removeToy , onSaveChat } = require('./toy.controller')

const router = express.Router()
//TODO:addToyMsg,removeToyMsg
// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getToys)
router.get('/:id', getToyById)
router.post('/', requireAuth,requireAdmin, addToy)
router.put('/:id', requireAuth,requireAdmin, updateToy)
router.delete('/:id', requireAuth, requireAdmin, removeToy)
router.put('/:id/chat', requireAuth, onSaveChat)
// router.post('/:id/msg', requireAuth, addCarMsg)
// router.delete('/:id/msg/:msgId', requireAuth, removeCarMsg)

module.exports = router