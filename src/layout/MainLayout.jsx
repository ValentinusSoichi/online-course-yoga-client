import { Outlet } from "react-router-dom"


const MainLayout = () => {
  return (
    <main className="dark:bg-black overflow-hidden">
        <nav>NavBar</nav>
      <Outlet />
      
    </main>
  )
}

export default MainLayout
