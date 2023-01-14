// const { useState } = React
// const { NavLink } = ReactRouterDOM
// const { useSelector, useDispatch } = ReactRedux

import { userService } from '../services/user.service.js'
import { SET_USER } from '../store/user.reducer.js'

import { logout } from '../store/user.action.js'

import { LoginSignup } from './login-signup.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink , Link} from 'react-router-dom'

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

        <header className="app-header ">
            <div className="contacts-header">
                <h1>contact us: + 972-542224422</h1>
            </div>
            <div className="main-container-header flex.space-between">
                <div className="nav-header flex ">

                <Link to="/"><div className="logo-name"> ToyZ </div></Link> 
                    <nav className="main-nav-container">
                        <NavLink className="nav-link" to="/">Home</NavLink>
                        <NavLink className="nav-link" to="/toy"> Toys</NavLink>
                        <NavLink className="nav-link" to="/about"> About</NavLink>
                        <NavLink className="nav-link" to="/report"> Reports</NavLink>

                    </nav>
                </div>


                {user && <div className="user-info-div"> <section className="user-info">
                    <p>{user.fullname} <span>${user.score.toLocaleString()}</span></p>
                    <button onClick={onLogout}>Logout</button>
                </section></div>}

                {!user && <section className="user-info">
                    <LoginSignup setUser={setUser} />
                </section>}
            </div>
        </header>
    )
}

