import React, { useState, useEffect } from "react"
import io from "socket.io-client"

const socket = io()

export default () => {

    const [divs, setDivs] = useState([])
    useEffect(() => {
        socket.on("message", ({random, NOW_URL}) => {

            console.log(`time: ${new Date().toLocaleTimeString()} ping: ${random} NOW_URL: ${NOW_URL}`)
            
            const lastDiv = divs[divs.length - 1]

            if(!(lastDiv && lastDiv.key === random)){
                const div = <div key={random}>time: {new Date().toLocaleTimeString()} ping: {random} NOW_URL: ${NOW_URL}</div>

                divs.push(div)
                setDivs(divs)
            }
        })

        return () => socket.removeListener("message")
    })

    return <>
        nowV2test
        {
            divs
        }
    </>
}
    
