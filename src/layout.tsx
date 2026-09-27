import { Bell, Calendar, House, Menu, NotebookText, User, Users, X } from "lucide-react";
import logo from "./assets/logo.svg";
import { HorizontalSeparator } from "./components/seperator";
import { NavLink, Outlet } from "react-router";
import { useWindowDimension } from "./lib/windowdimension";
import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "cn";

export default function Layout() {
    return (
        <div className="flex items-center justify-center bg-bg">
            <div className="grid grid-cols-[300px_1fr] max-lg:grid-cols-[1fr] w-full max-w-7xl h-screen gap-4 bg-bg">
              <SideBar/>
              <main className="overflow-y-auto pt-8 px-4">
                <Outlet/>
              </main>
            </div>
        </div>
    )
}

const navLinks = [
    {   title: "Dashboard", 
        path: "/",
        icon: House
    },
    {
        title: "Patients",
        path: "/patients",
        icon: Users
    },
    {
        title: "Drafts",
        path: "/drafts",
        icon: NotebookText
    },
    {   title: "Schedule", 
        path: "/",
        icon: Calendar
    },
    {   title: "Notifications", 
        path: "/",
        icon: Bell
    }
]

function SideBar() {
    const {width} = useWindowDimension()
    return (width < 1024 ? <MobileSideBar/> : <DesktopSideBar/>)
}

function DesktopSideBar() {
    return (
        <div className='relative h-full bg-bg-muted p-4 shadow-lg'>
            <div className="flex gap-2 items-center">
                <img src={logo} alt="RUACH" />
                <div className="flex flex-col">
                    <span className="text-lg font-bold">Ruach</span>
                    <span className="text-sm font-medium">PATIENT PORTAL</span>
                </div>
            </div>
            <HorizontalSeparator/>
            <nav className="flex flex-col gap-2 mt-4">
                {navLinks.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        className={({ isActive }) => isActive ? "flex items-center gap-2 p-2 text-text-inverted!  transition-colors rounded bg-primary hover:bg-primary-hover" : "flex items-center gap-2 p-2 hover:bg-bg/80 transition-colors rounded"}
                    >
                        <link.icon className="w-5 h-5 text-current/90" />
                        <span className="text-lg font-medium text-current/80">{link.title}</span>
                    </NavLink>
                ))}
            </nav>
            <div className="absolute right-4 bottom-4 left-4">
                <div className="flex items-center gap-2 bg-surface-muted p-2 rounded-lg border border-border">
                    <div className="flex items-center justify-center rounded-full bg-primary size-10 text-text-inverted/80"><User/></div>
                    <div><p className="">Dr. Julian Vance</p><p className="text-sm text-text-muted">ID: #88219</p></div>
                </div>
            </div>
        </div>
    )
}

function MobileSideBar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const togleSidebarOpen = () => setIsSidebarOpen((state) => !state)
    return (
        <>
        <button className="absolute right-4 top-4 bg-muted border rounded p-2 shadow-xl z-999" onClick={togleSidebarOpen}>{isSidebarOpen ? <X/> : <Menu/>}</button>
        
        {isSidebarOpen && <div className={cn('absolute inset-0 z-100 w-screen h-screen bg-bg-muted p-4 shadow-lg')}>
            <div className="flex gap-2 items-center">
                <img src={logo} alt="RUACH" />
                <div className="flex flex-col">
                    <span className="text-lg font-bold">Ruach</span>
                    <span className="text-sm font-medium">PATIENT PORTAL</span>
                </div>
            </div>
            <HorizontalSeparator/>
            <nav className="flex flex-col gap-2 mt-4">
                {navLinks.map((link, index) => (
                    <motion.div initial={{y: 100, opacity:0, scale:0.8}} animate={{y: 0, opacity:1, scale:[0.8, 1.02, 1]}} transition={{delay: 0.1 * index}} key={index}>
                        <NavLink
                            
                            to={link.path}
                            className={({ isActive }) => isActive ? "flex items-center gap-2 p-2 text-text-inverted!  transition-colors rounded bg-primary hover:bg-primary-hover" : "flex items-center gap-2 p-2 hover:bg-bg/80 transition-colors rounded"}
                        >
                            <link.icon className="w-5 h-5 text-current/90" />
                            <span className="text-lg font-medium text-current/80">{link.title}</span>
                        </NavLink>
                    </motion.div>
                ))}
            </nav>
            <div className="absolute right-4 bottom-4 left-4">
                <div className="flex items-center gap-2 bg-surface-muted p-2 rounded-lg border border-border">
                    <div className="flex items-center justify-center rounded-full bg-primary size-10 text-text-inverted/80"><User/></div>
                    <div><p className="">Dr. Julian Vance</p><p className="text-sm text-text-muted">ID: #88219</p></div>
                </div>
            </div>
        </div>}
        </>
    )
}