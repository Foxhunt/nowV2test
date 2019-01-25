import React, { useState, useEffect } from "react"
import io from "socket.io-client"

const socket = io()

function Ping({ data }){
    return <div>time: { data.time } ping: { data.number }</div>
}

export default () => {
    const [pings, setPings] = useState([])
    useEffect(() => {
        socket.on("message", ({random, NOW_URL}) => {
            console.log(`time: ${new Date().toLocaleTimeString()} ping: ${random} NOW_URL: ${NOW_URL}`)
            
            const numbers = pings.map(({ number }) => number)

            if(!numbers.includes(random)){
                pings.push({number: random, time: new Date().toLocaleTimeString()})
                setPings(pings)
            }
        })

        return () => socket.removeListener("message")
    })

    return <>
        nowV2test
        {
            pings.map(data => <Ping key={data.number} data={data}/>)
        }
    </>
}
