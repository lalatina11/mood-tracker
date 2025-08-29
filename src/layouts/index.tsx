import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { Outlet } from "react-router"

const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <div className="mt-20 md:mt-12">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default MainLayout