import { useNavigate } from "react-router-dom"
import { utilService } from "../services/util.service"



export function ToyPreview({ toy }) {
    const navigate = useNavigate()
    function handleClick() {
        navigate(`/toy/${toy._id}`)
    }
    return (

        <article onClick={handleClick} >
            <h4>{toy.name}</h4>
            <img src={require(`../assets/img/${toy.imgUrl || 'default.png'}`)} />
            {/* <h1>⛐</h1> */}
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <p>date: <span>{utilService.formatDate(toy.createdAt)}</span></p>
            {/* <NavLink to={`/toy/${toy._id}`}>Details</NavLink> |
        <NavLink to={`/toy/edit/${toy._id}`}>Edit</NavLink> */}

        </article>
    )
}