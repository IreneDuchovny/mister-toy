
import { useEffect, useRef, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { utilService } from "../services/util.service.js"


export function ToyFilter({ onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(toyService.getDefaultFilter())

    onSetFilter = useRef(utilService.debounce(onSetFilter))

    const elInputRef = useRef(null)

    useEffect(() => {
        elInputRef.current.focus()
    }, [])

    useEffect(() => {
        // update father cmp that filters change very type
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        // update father cmp that filters change on submit
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }


    return <section className="toy-filter ">
        {/* <h2>Toys Filter</h2> */}
        <form onSubmit={onSubmitFilter}>
            <label  htmlFor="search"></label>
            <input className="search-section" type="text"
                id="search"
                name="txt"
                placeholder="Search"
                value={filterByToEdit.txt}
                // onChange={() => utilService.debounce(handleChange,200)}
                onChange={handleChange}
                ref={elInputRef}
            />
            <select className= "category-section" name="label" id="label" value={filterByToEdit.label} onChange={handleChange}>
            <option value="" disabled>Category</option>
                <option value="">All</option>
                <option value="Remote Control">Remote Control</option>
                <option value="VR">VR</option>
                <option value="Aerial">Aerial</option>
                <option value="Puzzle">Puzzle</option>
                <option value="technology">Technology</option>
                <option value="Battery Powered">Battery Powered</option>
                <option value="Gaming">Gaming</option>
                <option value="Strategy">Strategy</option>
                <option value="Interactive">Interactive</option>
                <option value="Music">Music</option>
                <option value="Art">Art</option>
                <option value="Toy">Toy</option>
                <option value="Adult">Adult</option>
                <option value="Yard Work">Yard Work</option>
                <option value="Family">Family</option>
                <option value="Doll">Doll</option>
                <option value="Vehicle">Vehicle</option>
                <option value="Toddlers">Toddlers</option>
                <option value="Baby">Baby</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Electronics">Electronics</option>
                <option value="Outdoor">Outdoor</option>
                <option value="Talent">Talent</option>
                <option value="Plants">Plants</option>
                <option value=">Plush Toys">Plush Toys</option>
                <option value="Fun">Fun</option>
                <option value="Board Game">Board Game</option>


            </select>
            <label className= "price-section" htmlFor="maxPrice"> 1$ </label>
            <input className= "price-section-input"
                type="range"
                id="maxPrice"
                name="maxPrice"
                min="1"
                max="1000"
                value={filterByToEdit.maxPrice}
                onChange={handleChange} />
                <output  htmlFor="maxPrice" id="rangeval">{filterByToEdit.maxPrice}$ </output>

            <button hidden>Filter</button>
        </form>

    </section>
}