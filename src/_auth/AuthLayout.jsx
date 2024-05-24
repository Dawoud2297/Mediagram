import { Link, Outlet } from "react-router-dom"
import { useEffect, useState } from "react";
import { getCurrentUser, signOutAccount } from "../lib/appwrite/api";

const AuthLayout = () => {
    const [user, setUser] = useState({})

    const signOutUser = async () => {
        await signOutAccount();
        window.location.reload();
    }

    useEffect(() => {
        const checkUserSession = () => {
            getCurrentUser().then((res) => {
                setUser(res)
            });
        }
        checkUserSession()
    }, [])


    return (
        <div className="flex h-screen">
            <section className="formContainer">
                {
                    !user?.error && user?.$id ? (
                        <div className="flex flex-col gap-20 border-4 p-10 rounded-xl border-dark-4 text-xl">
                            <Link to="/" className="bg-dark-4 p-5 rounded-xl hover:bg-dark-3">Back To Home</Link>
                            <button onClick={signOutUser} className="p-5 rounded-xl hover:bg-dark-3">Logout</button>
                        </div>
                    )
                        : (
                            <Outlet />
                        )
                }
            </section>
            <video
                className="sideImg"
                autoFocus
                autoPlay
                muted
                preload="auto"
                loop
                poster="/assets/images/side-img.svg"
            >
                <source
                    src="/assets/video/authdesign.mp4"
                    type="video/mp4"
                />
            </video>
        </div>
    )
}

export default AuthLayout
