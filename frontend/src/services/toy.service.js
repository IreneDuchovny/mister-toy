
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { loadFromStorage, saveToStorage } from './syncStorage'
import { userService } from './user.service.js'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'toyDB'
const BASE_URL = 'toy/'

// _createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    // getRandomToy,
    getDefaultFilter
}


function query(filterBy = getDefaultFilter()) {
    const queryParams = ""//`?vendor=${filterBy.txt}&maxPrice=${filterBy.maxPrice}`
    return httpService.get(BASE_URL + queryParams)
}

// function query(filterBy = getDefaultFilter()) {
//     return storageService.query(STORAGE_KEY)
//         .then(toys => {
//             if (filterBy.txt) {
//                 const regex = new RegExp(filterBy.txt, 'i')
//                 toys = toys.filter(toy => regex.testtoy.name)
//             }
//             if (filterBy.maxPrice) {
//                 toys = toys.filter(toy => toy.price <= filterBy.maxPrice)
//             }
//             return toys
//         })
// }



function getById(toyId) {
   // return storageService.get(STORAGE_KEY, toyId)
    return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
    // return Promise.reject('Not now!')
    return httpService.delete(BASE_URL + toyId)
    // return storageService.remove(STORAGE_KEY, toyId)

}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL, toy)
        // return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        // toy.owner = userService.getLoggedinUser()
        return httpService.post(BASE_URL, toy)
        // return storageService.post(STORAGE_KEY, toy)
    }
}

function _createToys() {
    const toys = loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        const toys = [
            {
                "_id": utilService.makeId(),
                "name": "Talking Bear",
                "price": 123,
                "labels": ["Doll", "Battery Powered", "Baby"],
                "createdAt": 1631031801011,
                "inStock": true,
                "imgUrl": "toy1.png",
                "description": "This adorable bear is sure to be a hit with kids of all ages. Press its tummy to hear it say a variety of phrases. Requires 2 AA batteries (not included)."
            },

            {
                "_id": utilService.makeId(),
                "name": "Remote Control toy",
                "price": 45,
                "labels": ["Toy", "Vehicle", "Remote Control"],
                "createdAt": 1631033002011,
                "inStock": true,
                "imgUrl": "toy2.png",
                "description":" This remote control toy is perfect for kids who love to play with vehicles. With a sleek design and easy-to-use remote, kids can maneuver the toy in any direction."
            },
            {
                "_id": utilService.makeId(),
                "name": "Board Game",
                "price": 25,
                "labels": ["Family", "Strategy", "Entertainment"],
                "createdAt": 1631033103011,
                "inStock": true,
                "imgUrl": "toy3.png",
                "description":"This board game is a great choice for family game night. With a variety of gameplay options, it's sure to provide hours of entertainment for players of all ages."
            },
            {
                "_id": utilService.makeId(),
                "name": "Rubber Duck",
                "price": 800,
                "labels": ["Electronics", "Computer", "Work"],
                "createdAt": 1631033204011,
                "inStock": true,
                "imgUrl": "toy4.png",
                "description":" This rubber duck is a classic toy that never goes out of style. Perfect for bath time or playtime, this duck is sure to provide endless fun."
            },
            {
                "_id": utilService.makeId(),
                "name": "Gardening Tools",
                "price": 40,
                "labels": ["Outdoor", "Plants", "Yard Work"],
                "createdAt": 1631033305011,
                "inStock": true,
                "imgUrl": "toy5.png",
                "description":"These gardening tools are perfect for anyone with a green thumb. With a variety of implements to choose from, you'll have everything you need to care for your plants."
            },
            {
                "_id": utilService.makeId(),
                "name": "Musical Instrument",
                "price": 150,
                "labels": ["Music", "Art", "Talent"],
                "createdAt": 1631033406011,
                "inStock": true,
                "imgUrl": "toy6.png",
                "description": "This musical instrument is perfect for aspiring musicians. Whether you're just starting out or you're a seasoned pro, this instrument will help you create beautiful music."
            }
        ]
        saveToStorage(STORAGE_KEY, toys)
    }
}

function getDefaultFilter() {
    return { txt: '', maxPrice: 0 }
}
function getEmptyToy() {
    return {
        "price": 0,
        "inStock": true
    }
}

function getRandomToy() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


