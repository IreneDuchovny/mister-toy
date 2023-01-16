// const { useEffect, useState } = React
import { useEffect, useState } from 'react'
// const { useParams, useNavigate, Link } = ReactRouterDOM
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { CloudinaryImage } from '@cloudinary/url-gen';

import { AdvancedImage } from "@cloudinary/react";
import { ChatApp } from '../pages/chat-app.jsx'


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
async function onSaveChat(toyId, chat){
    try {
        await toyService.saveChat(toyId, chat)
        loadToy()
    } catch (err) {
        showErrorMsg('Cannot save chat')
    }
}


    if (!toy) return <div>Loading...</div>
    return <section className="toy-details">
        <div className="toy-details-main-container">
         <AdvancedImage cldImg={new CloudinaryImage(`${toy.imgUrl || 'default.png'}`, { cloudName: 'dfkarsfm0' })} />
         <div className="toy-details-info">
        <h1>{toy.name}</h1>
        <h5>${toy.price}.00</h5>
        {/* <img src={require(`../assets/img/${toy.imgUrl || 'default.png'}`)} /> */}
       
        <p>{toy.description}</p>
        <div className="review-edit-btns">
        {user && <button><Link to={`/toy/review/${toy._id}`}>Add review</Link></button>}
        {user && user.isAdmin && <button><Link to={`/toy/edit/${toy._id}`}>Edit</Link></button>}
       </div>
        </div>
        
        {user && <div className="chat-Area"><ChatApp toy={toy}  onSaveChat={onSaveChat}/></div> }
        
        </div>
        
      
    </section>
}