import { NavLink } from "react-router"
import { Button, buttonVariants } from "./ui/button"
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="flex items-center justify-center w-full p-4 border-t bg-card">
            <div className="flex flex-col gap-3 items-center justify-center">
                <p className="text-sm text-center text-gray-500">
                    @2025 All rights reserved.
                </p>
                <p className="text-sm text-center text-gray-500">
                    Made by Candra Rahmadan
                </p>
                <div className="flex gap-3 justify-center items-center">
                    <NavLink
                        to="https://github.com/lalatina11/mood-tracker"
                        className={"" + buttonVariants({ variant: "outline" })}
                    >
                        <FaGithub />
                    </NavLink>
                    <Button variant={"outline"}>
                        <FaLinkedin />
                    </Button>
                    <Button variant={"outline"}>
                        <FaFacebook />
                    </Button>
                    <Button variant={"outline"}>
                        <FaInstagram />
                    </Button>
                    <Button variant={"outline"}>
                        <FaYoutube />
                    </Button>
                </div>
            </div>
        </footer>
    )
}

export default Footer