import axios from 'axios'
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'
const AUTH_BASE_URL = 'auth/'
const USER_BASE_URL = 'user/'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    updateScore,
    getUsers,
    changeScore
    
}

window.us = userService

function getById(userId) {
    return httpService.get(USER_BASE_URL + userId)
}

function login(credentials) {
    return httpService.post(AUTH_BASE_URL + 'login', credentials)
        .then(_setLoggedinUser)
        .catch(err => {
            console.log('err:', err)
            throw new Error('Invalid login')
        })
}

// function login(credentials) {
//     return axios.post('//localhost:3030/api/user/login', credentials)
//         .then(user => {
//             console.log('user:', user)
//         })
// }

// function login({ username, password }) {
//     return storageService.query(STORAGE_KEY)
//         .then(users => {
//             const user = users.find(user => user.username === username)
//             if (user) return _setLoggedinUser(user)
//             else return Promise.reject('Invalid login')
//         })
// }



function signup({ username, password, fullname }) {
    const user = { username, password, fullname, score: 10000 }
    return httpService.post(AUTH_BASE_URL + 'signup', user)
        .then(_setLoggedinUser)
}


// function signup({ username, password, fullname }) {
//     const user = { username, password, fullname, score: 10000 }
//     return storageService.post(STORAGE_KEY, user)
//         .then(_setLoggedinUser)
// }

function updateScore(diff) {
    return userService.getById(getLoggedinUser()._id)
        .then(user => {
            if (user.score + diff < 0) return Promise.reject('No credit')
            user.score += diff
            return httpService.put(USER_BASE_URL + user._id, user)
            // return storageService.put(STORAGE_KEY, user)
                .then((user) => {
                    _setLoggedinUser(user)
                    return user.score
                })
        })
}

function logout() {
    return httpService.post(AUTH_BASE_URL + 'logout')
        .then(()=>{
            sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
        })
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, score: user.score, isAdmin:user.isAdmin }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}


async function changeScore(by) {
    const user = getLoggedinUser()
    if (!user) throw new Error('Not loggedin')
   // user.score = user.score + by || by
   // await update(user)
    return user.score
}


async function getUsers() {
    try {
    return httpService.get('user')
    } catch (err) {
        console.log('err:', err)
    }

}


// Test Data
// userService.signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja'})
// userService.login({username: 'muki', password: 'muki1'})



