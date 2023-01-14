// const { useState, useEffect } = React
// const { useSelector, useDispatch } = ReactRedux
// import logoUrl from '../assets/img/logo.png'
import { NavLink , Link} from 'react-router-dom'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadToys } from "../store/toy.action.js"

export function HomePage() {
    // const [count, setCount] = useState(10)
    const count = useSelector((storeState) => storeState.appModule.count)
    const dispatch = useDispatch()

    useEffect(() => {
        loadToys()
    }, [])

    function changeCount(diff) {
        console.log('Changing count by:', diff)
        // setCount(count + diff)
        dispatch({ type: 'CHANGE_BY', diff })
    }

    const imgUrl = '3127919-7.png'
    return (
        // <div> 
        <section>
            {/* <h2>
                Count {count}
                <button onClick={() => { changeCount(1) }}>+</button>
                <button onClick={() => { changeCount(10) }}>+10</button>
            </h2 > */}
            <div className="main-home-layout">
            <div className="home-btns">
            <Link to="/toy?type=kids">  <div className="kids-toys-btn"><div>  Kids toys </div></div></Link>
            <Link to="/toy?type=adult"><div className="teen-toys-btn">    <div>  Teen toys </div>  </div></Link>
              </div>
            <img className="home-page-img" src={require(`../assets/img/${imgUrl}`)} />
            </div>
        </section>
        // </div>
    )

}
