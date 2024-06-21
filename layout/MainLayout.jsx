import { Outlet } from "react-router-dom"
import Navbar from "../src/component/Navbar"
import Home from "../src/pages/home/Home"



const MainLayout = () => {
  return (
    <main className="dark:bg-black overflow-hidden">
        <Navbar />
      
        
      <Outlet />
      
    </main>
  )
}

export default MainLayout;
