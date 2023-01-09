// const { useEffect, useState } = React
import { useEffect, useState } from 'react'
// const { useParams, useNavigate, Link } = ReactRouterDOM
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'


import { toyService } from "../services/toy.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then((toy) => setToy(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            })
    }

    if (!toy) return <div>Loading...</div>
    return <section className="toy-details">
        <h1>{toy.name}</h1>
        <h5>Price: ${toy.price}</h5>
        <img src={require(`../assets/img/${toy.imgUrl || 'default.png'}`)} />
      <p>{toy.description}</p>
        <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
    </section>
}