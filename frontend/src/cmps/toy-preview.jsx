import { useNavigate } from "react-router-dom"
import { utilService } from "../services/util.service"
import {fill} from "@cloudinary/url-gen/actions/resize";
import {CloudinaryImage} from '@cloudinary/url-gen';

import {AdvancedImage} from "@cloudinary/react";


export function ToyPreview({ toy }) {
    const navigate = useNavigate()
    function handleClick() {
        navigate(`/toy/${toy._id}`)
    }
    const myImage = new CloudinaryImage(`${toy.imgUrl || 'default.png'}`, {cloudName: 'dfkarsfm0'})//.resize(fill().width(100).height(150));
    return (
        <article onClick={handleClick} >
            <h4>{toy.name}</h4>
            {/* <img src={require(`../assets/img/${toy.imgUrl || 'default.png'}`)} /> */}
            <AdvancedImage cldImg={myImage} />
            {/* <h1>⛐</h1> */}
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <p>date: <span>{utilService.formatDate(toy.createdAt)}</span></p>
            {/* <NavLink to={`/toy/${toy._id}`}>Details</NavLink> |
        <NavLink to={`/toy/edit/${toy._id}`}>Edit</NavLink> */}

        </article>
    )
}