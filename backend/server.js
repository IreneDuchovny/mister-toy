const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

// const toyService = require('./services/util.service.js')
const userService = require('./services/user.service.js')

const app = express()
const http = require('http').createServer(app)
// App configuration (production)
app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())

// App configuration (development)
if (process.env.NODE_ENV === 'production') {
    // Express serve static files on production environment
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
const corsOptions = {
    origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
    credentials: true
}
app.use(cors(corsOptions))
}

const authRoutes = require('./api/auth/auth.routes')
const userRoutes = require('./api/user/user.routes')
const toyRoutes = require('./api/toy/toy.routes')


// routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/toy', toyRoutes)

// Make every server-side-route to match the index.html
// so when requesting http://localhost:3030/index.html/car/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue-router to take it from there
app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// const logger = require('./services/logger.service')
const port = process.env.PORT || 5000
http.listen(port, () => {
    console.log('Server is running on port: ' + port)
})


// User API:
// List
// app.get('/api/user', (req, res) => {
//     const filterBy = req.query
//     userService.query(filterBy)
//         .then((users) => {
//             res.send(users)
//         })
//         .catch(err => {
//             console.log('Error:', err)
//             res.status(400).send('Cannot get users')
//         })
// })

// app.get('/api/user/:userId', (req, res) => {
//     const { userId } = req.params
//     userService.get(userId)
//         .then((user) => {
//             res.send(user)
//         })
//         .catch(err => {
//             console.log('Error:', err)
//             res.status(400).send('Cannot get user')
//         })
// })


// app.post('/api/user/login', (req, res) => {
  
//     const { username, password } = req.body
//     userService.login({ username, password })
//         .then((user) => {
//             const loginToken = userService.getLoginToken(user)
//             res.cookie('loginToken', loginToken)
//             res.send(user)
//         })
//         .catch(err => {
//             console.log('Error:', err)
//             res.status(400).send('Cannot login')
//         })
// })

// app.post('/api/user/signup', (req, res) => {
//     const { fullname, username, password, score } = req.body
//     userService.signup({ fullname, username, password, score })
//         .then((user) => {
//             const loginToken = userService.getLoginToken(user)
//             res.cookie('loginToken', loginToken)
//             res.send(user)
//         })
//         .catch(err => {
//             console.log('Error:', err)
//             res.status(400).send('Cannot signup')
//         })
// })






