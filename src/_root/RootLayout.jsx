import { useEffect, useState } from 'react'
import Topbar from '../components/shared/Topbar'
import LeftSidebar from '../components/shared/LeftSidebar'
import { Navigate, Outlet } from 'react-router-dom'
import Bottombar from '../components/shared/Bottombar'
import { getCurrentUser } from '../lib/appwrite/api'

const RootLayout = () => {
    // BUG : Logs Out on refresh page
    const [user, setUser] = useState({});

    useEffect(() => {
        const checkUserSession = () => {
            getCurrentUser().then((res) => {
                setUser(res)
            });
        }
        checkUserSession()
    }, [])

    return (
        <div className="w-full md:flex h-screen">
            <Topbar />
            <LeftSidebar />
            <section className="flex flex-1 h-full">
                {
                    user?.error ? (
                        <Navigate to="/log-in" />
                    )
                        : (
                            <Outlet />
                        )
                }
            </section>
            <Bottombar />
        </div>
    )
}

export default RootLayout
