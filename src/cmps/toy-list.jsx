import PropTypes from 'prop-types';
import { type } from "@testing-library/user-event/dist/type/index.js"
import { ToyPreview } from "./toy-preview.jsx"


export function ToyList({ toys, onRemoveToy, onEditToy }) {
    // console.log('nums:', nums)

    return <ul className="toy-list">
        {toys.map(toy =>
        
            <li className="toy-preview" key={toy._id}>
                <ToyPreview toy={toy} />

                <div>
                    <button onClick={() => { onRemoveToy(toy._id) }}>x</button>
                    <button onClick={() => { onEditToy(toy) }}>Change price</button>
                </div>

          
            </li>)}
    </ul>
}


// ToyList.propTypes = {
//     txt(props, propName, cmp) {
//         if (typeof props.txt !== 'string') {
//             return new Error('Txt Not a String!')
//         }
//     },
//     nums: PropTypes.array,
//     // toys() {

//     // }
// }

// const obg = {
//     a:1,
//     func() {

//     },

// }


// ToyList.defaultProps = {
//     nums: [1, 2, 3 ,4]
// }