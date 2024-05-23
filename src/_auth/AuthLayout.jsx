import { Outlet, useNavigate } from "react-router-dom"
import { useUserContext } from "../context/AuthContext";
import { useEffect } from "react";

const AuthLayout = () => {
    const { user } = useUserContext();
    const navigate = useNavigate();

    console.log(user)

    useEffect(() => {
        if (user.id) navigate("/")
    })

    return (
        <div className="flex h-screen">
            <section className="formContainer">
                <Outlet />
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
