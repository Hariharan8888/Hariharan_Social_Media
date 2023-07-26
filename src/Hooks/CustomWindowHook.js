import { useEffect, useState } from 'react'

const CustomWindowHook = () => {
    const[windowsize, setwindowsize] = useState({
        width: undefined,
        height: undefined
    })

    useEffect(() => {
        const handleResize =() =>{
        setwindowsize({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }

    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize",handleResize) },[] )

     return windowsize
  
}

export default CustomWindowHook