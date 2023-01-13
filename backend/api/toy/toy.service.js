const dbService = require('../../services/db.service')
// const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy = {}) {
    try {
        let criteria = {}
        if (filterBy.txt) {
            const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
            criteria = { $or: [{ name: txtCriteria }, { description: txtCriteria }] }
        }
        if (filterBy.label) {
            criteria.labels = filterBy.label
        }
  if (filterBy.maxPrice) {
            criteria.price = { $lte: +filterBy.maxPrice }
        }

        const collection = await dbService.getCollection('toys')
        let toys = await collection.find(criteria).toArray()
        return toys
    } catch (err) {
        console.error('cannot find toys', err)
        throw err
    }
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toys')
        const toy = await collection.findOne({ _id: ObjectId(toyId) })
        return toy
    } catch (err) {
        console.error(`cannot find toy ${toyId}`, err)
        throw err
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toys')
        await collection.deleteOne({ _id: ObjectId(toyId) })
    } catch (err) {
        console.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

async function update(toy) {
    try {
        const saveToy = {
            name: toy.name,
            price: toy.price,
            type: toy.type,
            inStock: toy.inStock,
            description: toy.description,

        }
        const collection = await dbService.getCollection('toys')
        await collection.updateOne({ _id: ObjectId(toy._id) }, { $set: saveToy })
        return toy
    } catch (err) {
        console.error(`cannot update toy ${toy._id}`, err)
        throw err
    }
}
async function add(toy) {
    try {
        const collection = await dbService.getCollection('toys')

        await collection.insertOne(toy)
        return toy
    } catch (err) {
        console.error(`cannot insert toy`, err)
        throw err
    }
}

//todo: add messages service 

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}