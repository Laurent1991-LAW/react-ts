import { useEffect, useRef } from "react"

function App() {

  const timeRef = useRef<number | undefined>(undefined)
  
  useEffect(() => {

    timeRef.current = setInterval(() => {
      console.log(1)
    }, 1000)
    return () => {
      clearInterval(timeRef.current)
    }
  }, [])

  return (
    <>
      <div>this is app</div>
    </>
  )
}

export default App
