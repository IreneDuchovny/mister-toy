// const { useState, useEffect } = React
// const { useSelector, useDispatch } = ReactRedux

import { UserMsg } from './user-msg.jsx'


import { useDispatch, useSelector } from 'react-redux'

export function AppFooter() {

    const count = useSelector((storeState) => storeState.appModule.count)
   
    // const toysCount = useSelector((storeState) => storeState.toyModule.toys.length)

   
    const dispatch = useDispatch()

    // TODO: move to storeState


    return (
        <footer>
            <h5>
                {/* Currently {toysCount} toys in the shop */}
            </h5>
            <p className="footer-content">
                Developed by Irene Duchovny
                {/* - Count: {count} */}
            </p>
          
           
            <UserMsg />
        </footer>
    )
}
