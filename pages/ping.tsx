import React, { useState, useEffect } from "react"
import io from "socket.io-client"

const socket = io()

type pingData = {
    number: number
    time: string
}

function Ping({ data }: { data: pingData }){
    return <div>time: { data.time } ping: { data.number }</div>
}

export default () => {
    const [pings, setPings] = useState<pingData[]>([])
    useEffect(() => {
        socket.on("message", ({random, NOW_URL}: {random: number, NOW_URL: string}) => {
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
