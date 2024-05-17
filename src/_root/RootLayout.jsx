import { useEffect } from 'react'
import Topbar from '../components/shared/Topbar'
import LeftSidebar from '../components/shared/LeftSidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import Bottombar from '../components/shared/Bottombar'
import { useUserContext } from '../context/AuthContext'
import { signOutAccount } from '../lib/appwrite/api'

const RootLayout = () => {
    // BUG : Logs Out on refresh page
    const { user } = useUserContext();
    const navigate = useNavigate();


    useEffect(() => {
        const logOut = setTimeout(() => {
            if (!user.id) {
                signOutAccount();
                navigate("/log-in")
            }
        }, 10000)
        return () => clearTimeout(logOut);

    }, [navigate, user.id])

    return (
        <div className="w-full md:flex h-screen">
            <Topbar />
            <LeftSidebar />
            <section className="flex flex-1 h-full">
                <Outlet />
            </section>
            <Bottombar />
        </div>
    )
}

export default RootLayout
