import { useEffect } from 'react'
import Topbar from '../components/shared/Topbar'
import LeftSidebar from '../components/shared/LeftSidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import Bottombar from '../components/shared/Bottombar'
import { useUserContext } from '../context/AuthContext'
import { signOutAccount } from '../lib/appwrite/api'
import { useGetCurrentUser } from '../lib/react-query/qAndMutations'

const RootLayout = () => {
    // BUG : Logs Out on refresh page
    const { user } = useUserContext();
    const { data: currentUser } = useGetCurrentUser();

    const navigate = useNavigate();

    useEffect(() => {

        if (currentUser?.error && !user.id) {
            signOutAccount();
            navigate("/log-in")
        }

    }, [currentUser?.error, navigate, user.id])


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
