const fs = require('fs');
const PAGE_SIZE = 30000
var toys = require('../data/toy.json')


module.exports = {
    query,
    get,
    remove,
    save
}

function query(filterBy) {
    filterBy.maxPrice = +filterBy.maxPrice
    let filteredtoys = toys
    if (filterBy.vendor) {
        const regex = new RegExp(filterBy.vendor, 'i')
        filteredtoys = filteredtoys.filter(toy => regex.test(toy.vendor))
    }
    if (filterBy.maxPrice) {
        filteredtoys = filteredtoys.filter(toy => toy.price <= filterBy.maxPrice)
    }
    return Promise.resolve(filteredtoys)
}

function get(toyId) {
    const toy = toys.find(toy => toy._id === toyId)
    if (!toy) return Promise.reject('toy not found')
    return Promise.resolve(toy)
}

function remove(toyId, loggedinUser) {
    const idx = toys.findIndex(toy => toy._id === toyId)
    if (idx === -1) return Promise.reject('No Such toy')
    const toy = toys[idx]
    if (toy.owner._id !== loggedinUser._id) return Promise.reject('Not your toy')
    toys.splice(idx, 1)
    return _writetoysToFile()
}


function save(toy, loggedinUser) {
    if (toy._id) {
        const toyToUpdate = toys.find(currtoy => currtoy._id === toy._id)
        if (!toyToUpdate) return Promise.reject('No such toy')
        if (toyToUpdate.owner._id !== loggedinUser._id) return Promise.reject('Not your toy')

        // toyToUpdate.vendor = toy.vendor
        // toyToUpdate.speed = toy.speed
        toyToUpdate.price = toy.price
        toyToUpdate.name = toy.name
        toyToUpdate.description = toy.description
        toyToUpdate.labels= toy.labels

       
    } else {
        toy._id = _makeId()
        toy.owner = { "username" : loggedinUser.username, "fullname" : loggedinUser.fullname, "_id" : loggedinUser._id }
        toys.push(toy)
    }
    return _writetoysToFile().then(() => toy)
}

function _makeId(length = 5) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}


function _writetoysToFile() {
    return new Promise((res, rej) => {
        const data = JSON.stringify(toys, null, 2)
        fs.writeFile('data/toy.json', data, (err) => {
            if (err) return rej(err)
            // console.log("File written successfully\n");
            res()
        });
    })
}