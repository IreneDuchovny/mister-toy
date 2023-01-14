// const { useEffect } = React
// const { useSelector, useDispatch } = ReactRedux
// const { Link } = ReactRouterDOM
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { ToyList } from '../cmps/toy-list.jsx'
import { ToyFilter } from '../cmps/toy-filter.jsx'
import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, saveToy } from '../store/toy.action.js'

import { useEffect } from 'react'
import { PopupMenu } from '../cmps/popup-menu.jsx'

export function ToyIndex() {

    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)
    const user = useSelector((storeState) => storeState.userModule.user)

    // const [toys, settoys] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        onloadToys()
    }, [])

    function onloadToys(filterBy) {
        loadToys(filterBy)
            .then(() => {
                // showSuccessMsg('toys loaded')
            })
            .catch(err => {
                showErrorMsg('Cannot load toys')
            })
    }

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }

    function onAddToy() {
        const toyToSave = toyService.getRandomToy()
        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`toy added (id: ${savedToy._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot add toy')
            })
    }

    function onEditToy(toy) {
     
        const price = +prompt('New price?')
        const toyToSave = { ...toy, price }
if (isNaN(price)) return showErrorMsg('Price must be a number')
        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`toy updated to price: $${savedToy.price}`)
            })
            .catch(err => {
                showErrorMsg('Cannot update toy')
            })
    }

    function setFilter(filterBy) {
        console.log('setFilter', filterBy)
        onloadToys(filterBy)
    }
    return <section>
        {/* <h3>toys App</h3> */}
        <main className="main-container">
            {/* <PopupMenu top={<h2>Popup in toy Index</h2>}>
                <Text/>
                <Text/>
                <Text/>
            </PopupMenu> */}

            <div className="filter-btns-container">
                <ToyFilter onSetFilter={setFilter} />
                {user &&  user.isAdmin && <div className="toy-add-btn">
                  
                <Link to={`/toy/edit`}><button >Add a toy</button> </Link>
                </div>}
                {/* <button onClick={onAddToy}>Random toy </button> */}
            </div>
            {/* {isLoading && <p>Loading...</p>} */}

            <ToyList
            user={user}
                toys={toys}
                onRemoveToy={onRemoveToy}
                onEditToy={onEditToy}
                nums={[7, 8]}
                txt={'77'}
            />
            {/* <hr /> */}
        </main>
    </section>
}

// const Text = () => {
//     return <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, eum!</span>
// }