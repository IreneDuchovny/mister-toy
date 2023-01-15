// const { useEffect, useState } = React
import { useEffect, useState } from 'react'
// const { useParams, useNavigate, Link } = ReactRouterDOM
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { CloudinaryImage } from '@cloudinary/url-gen';

import { AdvancedImage } from "@cloudinary/react";


import { toyService } from "../services/toy.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()
    const user = useSelector((storeState) => storeState.userModule.user)

    let myImage;
    useEffect( () => {
         loadToy()
    }, [toyId])

    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToy(toy)
        } catch (err) {

            console.log('Had issues in toy details', err)
            showErrorMsg('Cannot load toy')
            navigate('/toy')
        }
    }



    if (!toy) return <div>Loading...</div>
    return <section className="toy-details">
        <h1>{toy.name}</h1>
        <h5>Price: ${toy.price}</h5>
        {/* <img src={require(`../assets/img/${toy.imgUrl || 'default.png'}`)} /> */}
        <AdvancedImage cldImg={new CloudinaryImage(`${toy.imgUrl || 'default.png'}`, { cloudName: 'dfkarsfm0' })} />
        <p>{toy.description}</p>
        {user && user.isAdmin && <Link to={`/toy/edit/${toy._id}`}>Edit</Link>}
        {user && <Link to={`/toy/review/${toy._id}`}>Add review</Link>}
    </section>
}