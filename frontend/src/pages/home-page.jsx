// const { useState, useEffect } = React
// const { useSelector, useDispatch } = ReactRedux
// import logoUrl from '../assets/img/logo.png'

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

    const imgUrl = 'logo.png'
    return (
        <section>
            {/* <h2>
                Count {count}
                <button onClick={() => { changeCount(1) }}>+</button>
                <button onClick={() => { changeCount(10) }}>+10</button>
            </h2 > */}
            <img src={require(`../assets/img/${imgUrl}`)} />
        </section >
    )

}
