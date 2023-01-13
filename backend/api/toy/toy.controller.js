const toyService = require('./toy.service')
// const logger = require('../../services/logger.service')


async function getToys(req, res) {
    try {
        console.log('req.query', req.query)
        const toys = await toyService.query(req.query || {})
        res.json(toys)
    } catch (err) {
        console.error('Failed to get toys', err)
        res.status(500).send({ err: 'Failed to get toys' })
    }
}

async function getToyById(req, res) {
    try {
        const toyId = req.params.id
        const toy = await toyService.getById(toyId)
        res.json(toy)
    } catch (err) {
        console.error('Failed to get toy', err)
        res.status(500).send({ err: 'Failed to get toy' })
    }
}

async function addToy(req, res) {
    const toy = req.body
    try {
        // add timestamp
        toy.createdAt = Date.now()
       
        const savedToy = await toyService.add(toy)
        res.json(savedToy)
    } catch (err) {
        console.error('Failed to add toy', err)
        res.status(500).send({ err: 'Failed to add toy' })
    }
}

async function updateToy(req, res) {
    const toy = req.body
    try {
        const savedToy = await toyService.update(toy)
        res.json(savedToy)
    } catch (err) {
        console.error('Failed to update toy', err)
        res.status(500).send({ err: 'Failed to update toy' })
    }
}

async function removeToy(req, res) {
    const toyId = req.params.id
    try {
        const removedId = await toyService.remove(toyId)
        res.send({ msg: 'toy removed successfully', removedId })
    } catch (err) {
        console.error('Failed to remove toy', err)
        res.status(500).send({ err: 'Failed to remove toy' })
    }
}

module.exports = {
    getToys,
    getToyById,
    addToy,
    removeToy,
    updateToy
}