// const { useState } = React
// const { NavLink } = ReactRouterDOM
// const { useSelector, useDispatch } = ReactRedux

import { userService } from '../services/user.service.js'
import { SET_USER } from '../store/user.reducer.js'

import { logout } from '../store/user.action.js'

import { LoginSignup } from './login-signup.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

export function AppHeader() {

    // TODO: get from storeState
    // const [user, setUser] = useState(userService.getLoggedinUser())
    const user = useSelector((storeState => storeState.userModule.user))

    const dispatch = useDispatch()

    function setUser(user) {
        dispatch({ type: SET_USER, user })
    }

    function onLogout() {
        logout()
            .then(() => {
                setUser(null)
            })
    }

 

    return (
        
        <header className="app-header full">
            <div className="contacts-header">
                <h1>contact us:</h1>
            </div>
            <nav>
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/toy">Toys</NavLink> |
                <NavLink to="/about">About</NavLink> |
               
            </nav>

            <h1> ToyZ </h1>

            {user && <section className="user-info">
                <p>{user.fullname} <span>${user.score.toLocaleString()}</span></p>
                <button onClick={onLogout}>Logout</button>
            </section>}

            {!user && <section className="user-info">
                <LoginSignup setUser={setUser} />
            </section>}

        </header>
    )
}

