import { NavLink } from "react-router"
import { ModeToggle } from "./ModeToggle"

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 border-b bg-card z-10">
            <NavLink to={"/"} className="text-2xl font-semibold tracking-wide flex gap-2 items-center">
                <img src="/logo.svg" width={300} height={300} className="aspect-square w-8 object-cover" />
                <h1>Mood Tracker</h1>
            </NavLink>
            <ModeToggle />
        </nav>
    )
}

export default Navbar