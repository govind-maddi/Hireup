import { useEffect } from "react"
import Landingpage from "../ParentContComponents/Landingpage"

function Home() {

  useEffect(() => {
    localStorage.setItem("baseUrl","http://localhost:11000")
  }, [])

  return (
    <Landingpage/>
  )
}

export default Home;