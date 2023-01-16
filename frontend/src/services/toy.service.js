
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { loadFromStorage, saveToStorage } from './syncStorage'
import { userService } from './user.service.js'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'toy'
const BASE_URL = 'toy/'



export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    // getRandomToy,
    getDefaultFilter,
    getToyTypes,
    getTotalForType,
    getTotalPrecentPerType,
    saveChat

}
window.ts = toyService

async function query(filterBy = getDefaultFilter()) {

    return httpService.get(BASE_URL, filterBy)
    // }

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
}

async function getById(toyId) {
    // return storageService.get(STORAGE_KEY, toyId)
    return httpService.get(BASE_URL + toyId)
}


async function remove(toyId) {
    // return Promise.reject('Not now!')
    return httpService.delete(BASE_URL + toyId)
    // return storageService.remove(STORAGE_KEY, toyId)

}

async function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL + toy._id, toy)
        // return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        // toy.owner = userService.getLoggedinUser()
        return httpService.post(BASE_URL, toy)
        // return storageService.post(STORAGE_KEY, toy)
    }
}
function getEmptyToy() {
    return {
        "price": 0,
        "inStock": true
    }
}
async function saveChat(toyId, chat) {
    return httpService.put(BASE_URL + toyId + "/chat", chat)
}


function getTotalPrecentPerType(type) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            return { len: toys.filter(toy => toy.inStock).length, toysType: toys.filter(toy => toy.inStock) }
        }).then(({ len, toysType }) => {

            const inStockToys = toysType.filter(toy => toy.type === type);
            return (inStockToys.length / len) * 100;
        })
}

function getTotalForType(type) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            return toys.filter(toy => toy.type === type).length
        })
}

function getToyTypes() {
    return ['kids', 'adults']
}




function getDefaultFilter() {
    return { txt: '', label: '', maxPrice: 1000, }
}


function getRandomToy() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
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
                "inventory": 12,
                "type": "kids",
                "description": "This adorable bear is sure to be a hit with kids of all ages. Press its tummy to hear it say a variety of phrases. Requires 2 AA batteries (not included)."
            },

            {
                "_id": utilService.makeId(),
                "name": "Remote Control toy",
                "price": 45,
                "labels": ["Toy", "Vehicle", "Remote Control"],
                "createdAt": 1631033002011,
                "inStock": true,
                "inventory": 43,
                "imgUrl": "toy2.png",
                "type": "kids",
                "description": " This remote control toy is perfect for kids who love to play with vehicles. With a sleek design and easy-to-use remote, kids can maneuver the toy in any direction."
            },
            {
                "_id": utilService.makeId(),
                "name": "Board Game",
                "price": 25,
                "labels": ["Family", "Strategy", "Entertainment"],
                "createdAt": 1631033103011,
                "inStock": false,
                "inventory": 0,
                "imgUrl": "toy3.png",
                "type": "kids",
                "description": "This board game is a great choice for family game night. With a variety of gameplay options, it's sure to provide hours of entertainment for players of all ages."
            },
            {
                "_id": utilService.makeId(),
                "name": "Rubber Duck",
                "price": 800,
                "labels": ["Electronics", "Computer", "Work"],
                "createdAt": 1631033204011,
                "inStock": true,
                "inventory": 103,
                "imgUrl": "toy4.png",
                "type": "kids",
                "description": " This rubber duck is a classic toy that never goes out of style. Perfect for bath time or playtime, this duck is sure to provide endless fun."
            },
            {
                "_id": utilService.makeId(),
                "name": "Gardening Tools",
                "price": 40,
                "labels": ["Outdoor", "Plants", "Yard Work"],
                "createdAt": 1631033305011,
                "inStock": true,
                "inventory": 38,
                "imgUrl": "toy5.png",
                "type": "kids",
                "description": "These gardening tools are perfect for anyone with a green thumb. With a variety of implements to choose from, you'll have everything you need to care for your plants."
            },
            {
                "_id": utilService.makeId(),
                "name": "Musical Instrument",
                "price": 150,
                "labels": ["Music", "Art", "Talent"],
                "createdAt": 1631033406011,
                "inStock": true,
                "inventory": 58,
                "imgUrl": "toy6.png",
                "type": "kids",
                "description": "This musical instrument is perfect for aspiring musicians. Whether you're just starting out or you're a seasoned pro, this instrument will help you create beautiful music."
            },
            {
                "_id": utilService.makeId(),
                "name": "Strategy Board Game",
                "price": 50,
                "labels": ["Adult", "Board Game", "Strategy"],
                "createdAt": 1641031801011,
                "inStock": true,
                "inventory": 21,
                "imgUrl": "toy12.png",
                "type": "adults",
                "description": "This strategy board game is designed for adults and is perfect for game night with friends or family. With a variety of gameplay options and challenges, it's sure to provide hours of entertainment."
            },
            {
                "_id": utilService.makeId(),
                "name": "Virtual Reality Headset",
                "price": 100,
                "labels": ["Adult", "VR", "Gaming"],
                "createdAt": 1641031811011,
                "inStock": true,
                "inventory": 87,
                "imgUrl": "toy13.png",
                "type": "adults",
                "description": "This virtual reality headset is perfect for immersing yourself in a variety of gaming experiences. Compatible with most VR-ready games and video content."
            },
            {
                "_id": utilService.makeId(),
                "name": "Drone",
                "price": 200,
                "labels": ["Adult", "Electronics", "Aerial"],
                "createdAt": 1641031821011,
                "inStock": true,
                "inventory": 1,
                "imgUrl": "toy14.png",
                "type": "adults",
                "description": "This drone is perfect for aerial photography or exploring the great outdoors. With a HD camera and advanced navigation features, this drone is a great choice for hobbyists or professionals."
            },
            {
                "_id": utilService.makeId(),
                "name": "Escape Room Game",
                "price": 25,
                "labels": ["Adult", "Puzzle", "Interactive"],
                "createdAt": 1641031831011,
                "inStock": true,
                "inventory": 23,
                "imgUrl": "toy15.png",
                "type": "adults",
                "description": "This escape room game is perfect for players who love puzzles and challenges.  it's include mystery, brain-teaser and logic that will provide hours of entertainment for you and your friends."
            },
            {
                "_id": utilService.makeId(),
                "name": "3D Printing Pen",
                "price": 80,
                "labels": ["Adult", "Art", "Technology"],
                "createdAt": 1641031841011,
                "inStock": true,
                "inventory": 3,
                "imgUrl": "toy16.png",
                "type": "adults",
                "description": "This 3D printing pen is perfect for artists and designers who want to bring their creations to life. With this pen, you can easily create 3D models, sculptures, and other unique designs."
            },
            {
                "_id": utilService.makeId(),
                "name": "Puzzle Sculpture",
                "price": 30,
                "labels": ["Adult", "Puzzle", "Art"],
                "createdAt": 1641031852011,
                "inStock": true,
                "inventory": 54,
                "imgUrl": "toy17.png",
                "type": "adults",
                "description": "This puzzle sculpture is perfect for those who love the combination of art and puzzles. It's challenging and fun to assemble the pieces together to make a beautiful sculpture."
            },
        ]
        saveToStorage(STORAGE_KEY, toys)
    }
}


// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


