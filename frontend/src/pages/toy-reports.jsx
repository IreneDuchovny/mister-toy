import { useEffect } from 'react'
import { MyChart } from '../cmps/toy-charts.jsx'
import { toyService } from '../services/toy.service'
import { useState } from 'react'

export function ToyReports() {

    const [kids, setKids] = useState(0)
    const [adults, setAdults] = useState(0)
    const [inventoryPerTypeKids, setInventoryPerTypeKids] = useState(0)
    const [inventoryPerTypeAdults, setInventoryPerTypeAdults] = useState(0)
    useEffect(() => {
        toyService.getTotalForType('kids').then(kids => setKids(kids))
        // console.log('kids', kids)
        toyService.getTotalForType('adults').then(adults => setAdults(adults))
        toyService.getTotalPrecentPerType('kids').then(inventoryPerTypeKids => setInventoryPerTypeKids(inventoryPerTypeKids))
        toyService.getTotalPrecentPerType('adults').then(inventoryPerTypeAdults => setInventoryPerTypeAdults(inventoryPerTypeAdults))
    }, [])
 


    return (

        <div className="toy-reports">
            <h1>Toy Reports</h1>
            <div className="charts">
                <MyChart types={[kids,adults]} inventoryPerType={[inventoryPerTypeKids,inventoryPerTypeAdults]} />

            </div>
        </div>
    )
}